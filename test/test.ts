//带有字符串类型参数的函数  
function add(a:string, b:string): string;    
  
//带有数字类型参数的函数
function add(a:number, b:number): number;    
  
//函数定义
function add(a: any, b:any): any {    
    return a + b;    
}  
