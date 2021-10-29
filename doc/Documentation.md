# 功能设计说明

## 注册、登录功能

* 登录功能

  > 1. 首页用户名或者邮箱 + 密码登录
  > 2. 登录成功后返回Token,token记录到redis并设置超时时间
  > 3. 登录失败后提示弹层提示失败 (暂不做密码找回功能)

* 注册功能
  > 1. 首页切换登录 或是 注册
  > 2. 注册只能通过邮箱,输入邮箱地址,发送验证码邮件,记录到redis中
  > 3. 接受并匹配验证码,然后要求输入用户名(后台或者前端匹配) 和 密码，注册成功..并直接登录功能返回Token