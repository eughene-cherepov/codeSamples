import { AuthAPI } from "@api"
import {
    ILoginErrorResponse,
    ILoginSuccessResponse,
} from "@models/auth"
import { makeAutoObservable, runInAction } from "mobx"
import { IErrorResponse } from "@models/types"

export class AuthStore {
    user: ILoginSuccessResponse | null = null
    userError: IErrorResponse<ILoginErrorResponse> | null = null
    userLoading: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    login = async (email: string, password: string) => {
        this.userLoading = true
        const { data, error } = await AuthAPI.login(email, password)

        if (data) {
            await this.saveUserData(data)
        }

        runInAction(() => {
            this.user = data
            this.userError = error
            this.userLoading = false
        })
    }

}
