type Options = {
  baseURL: string
  cacheSize?: number
  tier?: 'prod' | 'dev'
}

class API {
  constructor(private options: Options){}
}

let badOptions = {
  baseURL: 'https://www.baidu.com',
  badTier: 'prod'
}
new API(badOptions)