# 无感知Token刷新机制

**前端用短期 Access Token（存 localStorage）请求接口，长期 Refresh Token 存在 HTTP-only Cookie，前端无法直接读取,防止xss跨站脚本攻击，但通过 withCredentials: true 发请求时浏览器会自动携带,同时设置SameSite=Lax/Strict（防止跨站请求携带）,同时前端在请求头携带随机生成的 CSRF Token。Access Token 过期时，调用刷新接口获取新 Token，多请求同时刷新会排队保证只刷新一次，刷新失败则清空 Token 并跳登录页，既安全又支持并发处理**
当多个请求同时过期时，第一个请求会获得刷新锁，去调用刷新接口获取新 Token。其他同时过期的请求检测到锁已被占用，就会进入等待队列，等刷新完成后再用新 Token 重试。这样保证同一时间只刷新一次，避免重复刷新，同时所有请求都能正确处理
```js
const axiosInstance = axios.create({
  baseURL: isHttpProxy ? '/proxy-url' : import.meta.env.VITE_BASE_API,
  timeout: DEFAULT_OPTIONS.timeout,
});

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_API = '/api/Auth/RefreshToken';

// 是否正在刷新 Token
let isRefreshing = false;
// 队列存储待重试请求
let failedQueue: { resolve: Function; reject: Function }[] = [];

/**
 * 处理失败队列
 * @param token 新 token 或 null
 * @param error 刷新 token 出错时传入
 */
const processQueue = (token: string | null, error?: any) => {
  failedQueue.forEach(p => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

/**
 * 刷新 Token
 * 前端无需获取 HTTP-only Cookie，浏览器会自动带上
 */
async function refreshToken() {
  const res = await api.auth.refreshToken({}, { withCredentials: true });
  const accessToken = `Bearer ${res.data.accessToken}`;
  localStorage.setItem(TOKEN_KEY, accessToken);
  return accessToken;
}

// 请求拦截器：给每个请求加上 Authorization
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers['Authorization'] = token;
  return config;
});

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 文件流单独处理
    if (response.config.responseType === 'blob') return response;

    // 业务请求成功
    if (response.data.isSuccess) return handleServiceResult(response.data);

    // 业务请求失败
    const errorResult = handleBusinessError(response.data, DEFAULT_BACKEND_OPTIONS);
    return handleServiceResult(errorResult, false);
  },
  async error => {
    const originalRequest = error.config as any;

    // 1. 处理 401 且未重试的请求
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 2. 如果没有正在刷新 Token，开始刷新
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = await refreshToken();
          axiosInstance.defaults.headers.common['Authorization'] = newToken;

          // 3. 重试队列中所有请求
          processQueue(newToken);

          // 4. 重试原始请求
          return axiosInstance(originalRequest);
        } catch (err) {
          // 刷新失败，队列中的请求全部失败
          processQueue(null, err);
          localStorage.removeItem(TOKEN_KEY);
          window.location.href = '#/login';
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      // 5. 如果正在刷新 Token，把请求加入队列，等待刷新完成
      return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
        .then((token: string) => {
          originalRequest.headers['Authorization'] = token;
          return axiosInstance(originalRequest);
        })
        .catch(err => Promise.reject(err));
    }

    // 6. 非 401 或已重试过，直接返回错误
    return Promise.reject(handleServiceResult(handleResponseError(error.response), false));
  }
);

```