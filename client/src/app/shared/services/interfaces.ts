import { Data } from '@angular/router';

export interface User{
    _id: string,
    userId: string,
    name: string,
    password: string,
    email: string,
    phone: number,
    avatarSrc?: string,
    exp: number;
    iat: number;
}

export interface Message{
    message: string
}

export interface Note{
    title: string,
    description: string,
    _noteId?: string,
    _id?: string,
    date: Data,
    imageSrc?: File,
    user?: string
}

export interface TokenResponse {
    token: string;
  }
  
export interface TokenPayload {
    userId: string,
    email: string;
    password: string;
    name?: string;
    phone: number;
    avatarSrc?: File;
  }