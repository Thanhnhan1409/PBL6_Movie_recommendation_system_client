/**
 * Định nghĩa biến môi trường phía server. Kiểm tra thủ công để đảm bảo chúng tồn tại và hợp lệ.
 */
const serverEnv = {
  TOKEN: process.env.NEXT_PUBLIC_TOKEN_API,
  NODE_ENV: process.env.NODE_ENV,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}

/**
 * Định nghĩa biến môi trường phía client. Các biến này phải có tiền tố `NEXT_PUBLIC_`.
 */
const clientEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
}

// Kiểm tra biến môi trường server
for (const [key, value] of Object.entries(serverEnv)) {
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`❌ Environment variable ${key} is required`)
  }
}

// Kiểm tra biến môi trường client
for (const [key, value] of Object.entries(clientEnv)) {
  if (!value) {
    throw new Error(`❌ Client environment variable ${key} is required`)
  }
}

/**
 * Hợp nhất biến môi trường server và client
 */
const envMerger = {
  ...serverEnv,
  ...clientEnv,
}

// Tạo proxy để ngăn việc truy cập biến môi trường phía server từ client
const isServer = typeof window === "undefined"

export const env = new Proxy(envMerger, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined
    if (!isServer && !prop.startsWith("NEXT_PUBLIC_")) {
      throw new Error(
        `❌ Attempted to access server-side environment variable '${prop}' on the client`
      )
    }
    // @ts-ignore
    return target[prop]
  },
})
