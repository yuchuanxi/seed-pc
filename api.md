## 接口规范

```
{
  entry: [] || {}, // 接口实际返回数据
  message: '', // 服务端成功／失败消息
  code: 0, // 服务端状态码，未登录为12或者后端定一个状态码，前端用以判断登录状态
  status: true // 接口请求是否完成（按操作是否成功完成赋值，而不是是否接受到接口赋值）
}
```

- 接口字段(包括entry)符合类型不变原则。如返回entry: [1,2],在无结果的是否返回[]; entry:{a:1}，在无结果的是否返回{}; entry: 'strging',在无结果的时候返回entry:''。
- 前端以json格式传参(`Content-Type:application/json`)
- 后端接口返回json格式数据(`Content-Type:application/json; charset=utf-8`)

## 接口文档

### 发送验证码

- 说明：发送验证码
- url: '/yiyuanpai/api/user/code'
- method: POST
- 参数

```
{
  mobile: '13700000222' // 用户手机号
}
```