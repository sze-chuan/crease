/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.11.3.0 (NJsonSchema v10.4.4.0 (Newtonsoft.Json v12.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IBankCardsClient {
    get(): Observable<BankCardDto[]>;
}

@Injectable({
    providedIn: 'root'
})
export class BankCardsClient implements IBankCardsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    get(): Observable<BankCardDto[]> {
        let url_ = this.baseUrl + "/api/BankCards";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<BankCardDto[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<BankCardDto[]>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<BankCardDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(BankCardDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<BankCardDto[]>(<any>null);
    }
}

export interface ICardsClient {
    getAll(): Observable<CardDto[]>;
    create(command: CreateCardCommand): Observable<number>;
    get(cardId: number): Observable<CardDto>;
}

@Injectable({
    providedIn: 'root'
})
export class CardsClient implements ICardsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    getAll(): Observable<CardDto[]> {
        let url_ = this.baseUrl + "/api/Cards";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGetAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGetAll(<any>response_);
                } catch (e) {
                    return <Observable<CardDto[]>><any>_observableThrow(e);
                }
            } else
                return <Observable<CardDto[]>><any>_observableThrow(response_);
        }));
    }

    protected processGetAll(response: HttpResponseBase): Observable<CardDto[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(CardDto.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CardDto[]>(<any>null);
    }

    create(command: CreateCardCommand): Observable<number> {
        let url_ = this.baseUrl + "/api/Cards";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(command);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processCreate(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processCreate(<any>response_);
                } catch (e) {
                    return <Observable<number>><any>_observableThrow(e);
                }
            } else
                return <Observable<number>><any>_observableThrow(response_);
        }));
    }

    protected processCreate(response: HttpResponseBase): Observable<number> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = resultData200 !== undefined ? resultData200 : <any>null;
            return _observableOf(result200);
            }));
        } else {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let resultdefault: any = null;
            let resultDatadefault = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            resultdefault = ProblemDetails.fromJS(resultDatadefault);
            return throwException("A server side error occurred.", status, _responseText, _headers, resultdefault);
            }));
        }
    }

    get(cardId: number): Observable<CardDto> {
        let url_ = this.baseUrl + "/api/Cards/{cardId}";
        if (cardId === undefined || cardId === null)
            throw new Error("The parameter 'cardId' must be defined.");
        url_ = url_.replace("{cardId}", encodeURIComponent("" + cardId));
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<CardDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CardDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<CardDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = CardDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CardDto>(<any>null);
    }
}

export interface ICardStatementsClient {
    get(cardId: number | undefined, date: Date | undefined): Observable<CardStatementDto>;
}

@Injectable({
    providedIn: 'root'
})
export class CardStatementsClient implements ICardStatementsClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    get(cardId: number | undefined, date: Date | undefined): Observable<CardStatementDto> {
        let url_ = this.baseUrl + "/api/CardStatements?";
        if (cardId === null)
            throw new Error("The parameter 'cardId' cannot be null.");
        else if (cardId !== undefined)
            url_ += "CardId=" + encodeURIComponent("" + cardId) + "&";
        if (date === null)
            throw new Error("The parameter 'date' cannot be null.");
        else if (date !== undefined)
            url_ += "Date=" + encodeURIComponent(date ? "" + date.toJSON() : "") + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "application/json"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processGet(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processGet(<any>response_);
                } catch (e) {
                    return <Observable<CardStatementDto>><any>_observableThrow(e);
                }
            } else
                return <Observable<CardStatementDto>><any>_observableThrow(response_);
        }));
    }

    protected processGet(response: HttpResponseBase): Observable<CardStatementDto> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (<any>response).error instanceof Blob ? (<any>response).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = CardStatementDto.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap(_responseText => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<CardStatementDto>(<any>null);
    }
}

export class BankCardDto implements IBankCardDto {
    id?: number;
    name?: string | undefined;
    bank?: Bank | undefined;

    constructor(data?: IBankCardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
            this.bank = _data["bank"] ? Bank.fromJS(_data["bank"]) : <any>undefined;
        }
    }

    static fromJS(data: any): BankCardDto {
        data = typeof data === 'object' ? data : {};
        let result = new BankCardDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["bank"] = this.bank ? this.bank.toJSON() : <any>undefined;
        return data; 
    }
}

export interface IBankCardDto {
    id?: number;
    name?: string | undefined;
    bank?: Bank | undefined;
}

export abstract class ValueObject implements IValueObject {

    constructor(data?: IValueObject) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
    }

    static fromJS(data: any): ValueObject {
        data = typeof data === 'object' ? data : {};
        throw new Error("The abstract class 'ValueObject' cannot be instantiated.");
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        return data; 
    }
}

export interface IValueObject {
}

export class Bank extends ValueObject implements IBank {
    name?: string | undefined;

    constructor(data?: IBank) {
        super(data);
    }

    init(_data?: any) {
        super.init(_data);
        if (_data) {
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): Bank {
        data = typeof data === 'object' ? data : {};
        let result = new Bank();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        super.toJSON(data);
        return data; 
    }
}

export interface IBank extends IValueObject {
    name?: string | undefined;
}

export class CardDto implements ICardDto {
    id?: number;
    name?: string | undefined;

    constructor(data?: ICardDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    }

    static fromJS(data: any): CardDto {
        data = typeof data === 'object' ? data : {};
        let result = new CardDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        return data; 
    }
}

export interface ICardDto {
    id?: number;
    name?: string | undefined;
}

export class ProblemDetails implements IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;

    constructor(data?: IProblemDetails) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.type = _data["type"];
            this.title = _data["title"];
            this.status = _data["status"];
            this.detail = _data["detail"];
            this.instance = _data["instance"];
        }
    }

    static fromJS(data: any): ProblemDetails {
        data = typeof data === 'object' ? data : {};
        let result = new ProblemDetails();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["type"] = this.type;
        data["title"] = this.title;
        data["status"] = this.status;
        data["detail"] = this.detail;
        data["instance"] = this.instance;
        return data; 
    }
}

export interface IProblemDetails {
    type?: string | undefined;
    title?: string | undefined;
    status?: number | undefined;
    detail?: string | undefined;
    instance?: string | undefined;
}

export class CreateCardCommand implements ICreateCardCommand {
    bankCardId?: number;
    name?: string | undefined;
    cardNumber?: string | undefined;
    startDate?: Date;

    constructor(data?: ICreateCardCommand) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.bankCardId = _data["bankCardId"];
            this.name = _data["name"];
            this.cardNumber = _data["cardNumber"];
            this.startDate = _data["startDate"] ? new Date(_data["startDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): CreateCardCommand {
        data = typeof data === 'object' ? data : {};
        let result = new CreateCardCommand();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["bankCardId"] = this.bankCardId;
        data["name"] = this.name;
        data["cardNumber"] = this.cardNumber;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        return data; 
    }
}

export interface ICreateCardCommand {
    bankCardId?: number;
    name?: string | undefined;
    cardNumber?: string | undefined;
    startDate?: Date;
}

export class CardStatementDto implements ICardStatementDto {
    id?: number;
    monthYear?: string | undefined;
    transactions?: TransactionDto[] | undefined;

    constructor(data?: ICardStatementDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.monthYear = _data["monthYear"];
            if (Array.isArray(_data["transactions"])) {
                this.transactions = [] as any;
                for (let item of _data["transactions"])
                    this.transactions!.push(TransactionDto.fromJS(item));
            }
        }
    }

    static fromJS(data: any): CardStatementDto {
        data = typeof data === 'object' ? data : {};
        let result = new CardStatementDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["monthYear"] = this.monthYear;
        if (Array.isArray(this.transactions)) {
            data["transactions"] = [];
            for (let item of this.transactions)
                data["transactions"].push(item.toJSON());
        }
        return data; 
    }
}

export interface ICardStatementDto {
    id?: number;
    monthYear?: string | undefined;
    transactions?: TransactionDto[] | undefined;
}

export class TransactionDto implements ITransactionDto {
    id?: number;
    cardStatementId?: number;
    paymentType?: string | undefined;
    paymentTypeCategory?: string | undefined;
    description?: string | undefined;
    date?: Date;
    amount?: number;

    constructor(data?: ITransactionDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.cardStatementId = _data["cardStatementId"];
            this.paymentType = _data["paymentType"];
            this.paymentTypeCategory = _data["paymentTypeCategory"];
            this.description = _data["description"];
            this.date = _data["date"] ? new Date(_data["date"].toString()) : <any>undefined;
            this.amount = _data["amount"];
        }
    }

    static fromJS(data: any): TransactionDto {
        data = typeof data === 'object' ? data : {};
        let result = new TransactionDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["cardStatementId"] = this.cardStatementId;
        data["paymentType"] = this.paymentType;
        data["paymentTypeCategory"] = this.paymentTypeCategory;
        data["description"] = this.description;
        data["date"] = this.date ? this.date.toISOString() : <any>undefined;
        data["amount"] = this.amount;
        return data; 
    }
}

export interface ITransactionDto {
    id?: number;
    cardStatementId?: number;
    paymentType?: string | undefined;
    paymentTypeCategory?: string | undefined;
    description?: string | undefined;
    date?: Date;
    amount?: number;
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isSwaggerException = true;

    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((<any>event.target).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}