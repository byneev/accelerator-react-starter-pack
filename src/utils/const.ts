export const STARS = [1, 2, 3, 4, 5];

export const LOCALE = 'ru';

export const BASE_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';

export const TIMEOUT_TIME = 5000;

export enum AppRoute {
    Main = '/',
    NotFound = '/404',
    Guitars = '/guitars',
    Cart = '/cart',
    Catalog = '/catalog',
    Page = '/page',
}

export enum APIRoute {
    Guitars = '/guitars',
    Comments = '/comments',
    Coupons = '/coupons',
    Orders = '/orders',
}

export enum RouteAlias {
    Main = 'Главная',
    Catalog = 'Каталог',
    Cart = 'Корзина',
    NotFound = '404',
    Guitar = 'Гитара',
}

export enum HTTPCode {
    Unauthorized = 401,
    BadRequest = 400,
    NotFound = 404,
}

export enum SortType {
    Default = 'default',
    Price = 'price',
    Popular = 'popular',
    Ascending = 'ascending',
    Descending = 'descending',
}

export const AppRouteAliases = new Map<AppRoute, string>([
    [AppRoute.Main, RouteAlias.Main],
    [AppRoute.Catalog, RouteAlias.Catalog],
    [AppRoute.Cart, RouteAlias.Cart],
]);
