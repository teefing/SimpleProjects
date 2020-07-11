module.exports = [
  {
    title: '迁移storage',
    replacement: {
      setStorage: 'set',
      setStorageSync: 'set',
      getStorage: 'get',
      getStorageSync: 'get'
    },
    replaceToken: 'Taro',
    token: 'storage',
    file: 'src/lib/storage',
    include: [ '/src' ]
  }
]
