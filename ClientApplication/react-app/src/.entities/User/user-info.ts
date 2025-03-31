class UserInfo {
    private _id: any;
    private _username: any;
    private _wordread: any;
    private _minutesread: any;
    private _correctquestions: any;
    private _totalquestions: any;
    private _articlecountread: any;


    constructor(id: number, username: string, wordread: number, minutesread: number, correctquestions: number, totalquestions: number, articlecountread: number) {
        this._id = id;
        this._username = username;
        this._wordread = wordread;
        this._minutesread = minutesread;
        this._correctquestions = correctquestions;
        this._totalquestions = totalquestions;
        this._articlecountread = articlecountread;
    }

    get id() : number{
        return this._id;
    }

    get username() : string {
        return this._username;
    }

    get wordread(): number {
        return this._wordread;
    }

    get minutesread() : number {
        return this._minutesread;
    }

    get correctquestions() : number {
        return this._correctquestions;
    }

    get totalquestions() : number {
        return this._totalquestions;
    }

    get articlecountread() : number {
        return this._articlecountread;
    }

}

export default UserInfo;