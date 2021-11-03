import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
// 全局异常返回处理（过滤器）
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException>{
    catch(exception:HttpException,host:ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        const exceptionRes: any = exception.getResponse();
        const {error,message} = exceptionRes;
        response.status(status).json({
            // status,
            code:-1,
            timestamp: new Date().toISOString(),
            path: request.url,
            error,
            message,
        });
    }
}