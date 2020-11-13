// 以下两个是重载签名
function override(value: number): number;
function override(value: string): string;

// 这个是实现签名
// 实现签名必须兼容重载签名
function override(value: number | string): number | string {
  return value
}