// Angular Modules
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';


// Third's Module
import { Observable } from 'rxjs';
import { environment } from 'public/environments/environment';

// Global Variables


export const apiUrlInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

    // Base URL
    const baseUrl = environment.API_URL;

    // Si la petición es a un archivo, no se le añade el baseUrl
    if (req.url.includes('assets') || req.url.includes('json')) {
        return next(req);
    }

    // Clone the request object
    req = req.clone({
        url: `${baseUrl}${req.url}`,
    });

    // Devolver la petición
    return next(req);
};
