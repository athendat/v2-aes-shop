import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { ErrorService } from "../../shared/services/error.service";
import { LoggingService } from "../../shared/services/logging.service";
import { NotificationService } from "../../shared/services/notification.service";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {
    private errorService = inject(ErrorService);
    private logger = inject(LoggingService);
    private notifier = inject(NotificationService);


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                // Handle HTTP errors here
                console.error({ error });
                console.error('HTTP Error:', error.error);

                // You can perform additional error handling tasks here,
                // such as logging the error, displaying a notification, etc.
                const errorMessage = this.errorService.getClientErrorMessage(error.error.message);
                this.logger.logError(errorMessage);
                this.notifier.showError(errorMessage);

                // Rethrow the error to propagate it down the error handling chain
                return throwError(() => error)
            })
        );
    }
}
