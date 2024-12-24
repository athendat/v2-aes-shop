import { Injectable, NgZone, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../public/environments/environment';
import { Params } from '../interface/core.interface';
import { NotificationModel } from '../interface/notification.interface';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private zone = inject(NgZone);
    private http = inject(HttpClient);
    private modalService = inject(NgbModal);
    private toastr = inject(ToastrService);


    public alertSubject = new Subject();

    public notification: boolean = true;

    showSuccess(message: string): void {
        this.alertSubject.next({ type: 'success', message: message });
        this.zone.run(() => {
            this.modalService.dismissAll();
            if (this.notification) {
                this.toastr.success(message);
            }
        });
    }

    showError(message: string): void {
        this.alertSubject.next({ type: 'error', message: message });
        this.zone.run(() => {
            if (this.notification) {
                this.toastr.error(message);
            }
        });
    }

    showInfo(message: string): void {
        this.alertSubject.next({ type: 'info', message: message });
        this.zone.run(() => {
            if (this.notification) {
                this.toastr.info(message);
            }
        });
    }

    showWarning(message: string): void {
        this.alertSubject.next({ type: 'warning', message: message });
        this.zone.run(() => {
            if (this.notification) {
                this.toastr.warning(message);
            }
        });
    }

    getNotifications(payload?: Params): Observable<NotificationModel> {
        return this.http.get<NotificationModel>(`/notifications`, { params: payload });
    }

}
