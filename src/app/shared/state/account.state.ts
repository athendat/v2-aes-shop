import { Injectable, inject } from "@angular/core";
import { Action, Selector, State, StateContext, select } from "@ngxs/store";

import { AccountService } from "../services/account.service";
import { NotificationService } from "../services/notification.service";
import { AddressesService } from "../services/addresses.service";

import {
    GetUserDetails, UpdateUserProfile, UpdateUserPassword,
    CreateAddress, UpdateAddress, DeleteAddress, AccountClear,
    UpdateUserDetails
} from "../action/account.action";
import { AuthState } from "./auth.state";

import { AccountUser, AccountUserUpdatePassword } from "./../interface/account.interface";
import { Permission } from "../interface/role.interface";

export class AccountStateModel {
    user: AccountUser | null;
    permissions: Permission[];
}

@State<AccountStateModel>({
    name: "account",
    defaults: {
        user: null,
        permissions: []
    },
})
@Injectable()
export class AccountState {

    isAuthenticated = select(AuthState.isAuthenticated);

    #accountService = inject(AccountService);
    #addressService = inject(AddressesService);
    #notificationService = inject(NotificationService);


    @Selector()
    static user(state: AccountStateModel) {
        return state.user;
    }

    @Selector()
    static permissions(state: AccountStateModel) {
        return state.permissions;
    }

    @Action(GetUserDetails)
    getUserDetails(ctx: StateContext<AccountStateModel>) {

        // Si el usuario no está autenticado, no se puede obtener los detalles del usuario
        if (!this.isAuthenticated()) {
            return;
        }

        return this.#accountService.getUserDetails().subscribe({
            next: result => {
                ctx.patchState({
                    user: result.data,
                    permissions: result.data?.role?.permissions || [],
                });
            },
            error: err => {
                throw new Error(err?.error?.message);
            }
        });

    }

    @Action(UpdateUserDetails)
    updateUserDetails(ctx: StateContext<AccountStateModel>, action: UpdateUserDetails) {
        ctx.patchState({
            user: action.payload.user,
            permissions: action.payload.permissions,
        });
    }


    @Action(UpdateUserProfile)
    updateProfile(ctx: StateContext<AccountStateModel>, { payload }: UpdateUserProfile) {
        // Update Profile Logic Here
    }

    @Action(UpdateUserPassword)
    updatePassword(ctx: StateContext<AccountUserUpdatePassword>, { payload }: UpdateUserPassword) {
        // Update Password Logic Here
    }

    @Action(CreateAddress)
    createAddress(ctx: StateContext<AccountStateModel>, action: CreateAddress) {
        // Create Address Logic Here
    }

    @Action(UpdateAddress)
    updateAddress(ctx: StateContext<AccountStateModel>, action: UpdateAddress) {
        // Update Address Logic Here
    }

    @Action(DeleteAddress)
    deleteAddress(ctx: StateContext<AccountStateModel>, action: DeleteAddress) {
        // Delete Address Logic Here
    }

    @Action(AccountClear)
    accountClear(ctx: StateContext<AccountStateModel>) {
        ctx.patchState({
            user: null,
            permissions: []
        });
    }

}
