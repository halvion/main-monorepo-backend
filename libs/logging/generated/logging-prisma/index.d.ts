
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model RequestLogHeader
 * 
 */
export type RequestLogHeader = $Result.DefaultSelection<Prisma.$RequestLogHeaderPayload>
/**
 * Model RequestLogDetail
 * 
 */
export type RequestLogDetail = $Result.DefaultSelection<Prisma.$RequestLogDetailPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more RequestLogHeaders
 * const requestLogHeaders = await prisma.requestLogHeader.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more RequestLogHeaders
   * const requestLogHeaders = await prisma.requestLogHeader.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.requestLogHeader`: Exposes CRUD operations for the **RequestLogHeader** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestLogHeaders
    * const requestLogHeaders = await prisma.requestLogHeader.findMany()
    * ```
    */
  get requestLogHeader(): Prisma.RequestLogHeaderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestLogDetail`: Exposes CRUD operations for the **RequestLogDetail** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestLogDetails
    * const requestLogDetails = await prisma.requestLogDetail.findMany()
    * ```
    */
  get requestLogDetail(): Prisma.RequestLogDetailDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    RequestLogHeader: 'RequestLogHeader',
    RequestLogDetail: 'RequestLogDetail'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "requestLogHeader" | "requestLogDetail"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      RequestLogHeader: {
        payload: Prisma.$RequestLogHeaderPayload<ExtArgs>
        fields: Prisma.RequestLogHeaderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestLogHeaderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestLogHeaderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload>
          }
          findFirst: {
            args: Prisma.RequestLogHeaderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestLogHeaderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload>
          }
          findMany: {
            args: Prisma.RequestLogHeaderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload>[]
          }
          create: {
            args: Prisma.RequestLogHeaderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload>
          }
          createMany: {
            args: Prisma.RequestLogHeaderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestLogHeaderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload>[]
          }
          delete: {
            args: Prisma.RequestLogHeaderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload>
          }
          update: {
            args: Prisma.RequestLogHeaderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload>
          }
          deleteMany: {
            args: Prisma.RequestLogHeaderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestLogHeaderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestLogHeaderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload>[]
          }
          upsert: {
            args: Prisma.RequestLogHeaderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogHeaderPayload>
          }
          aggregate: {
            args: Prisma.RequestLogHeaderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestLogHeader>
          }
          groupBy: {
            args: Prisma.RequestLogHeaderGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestLogHeaderGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestLogHeaderCountArgs<ExtArgs>
            result: $Utils.Optional<RequestLogHeaderCountAggregateOutputType> | number
          }
        }
      }
      RequestLogDetail: {
        payload: Prisma.$RequestLogDetailPayload<ExtArgs>
        fields: Prisma.RequestLogDetailFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestLogDetailFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestLogDetailFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload>
          }
          findFirst: {
            args: Prisma.RequestLogDetailFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestLogDetailFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload>
          }
          findMany: {
            args: Prisma.RequestLogDetailFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload>[]
          }
          create: {
            args: Prisma.RequestLogDetailCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload>
          }
          createMany: {
            args: Prisma.RequestLogDetailCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestLogDetailCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload>[]
          }
          delete: {
            args: Prisma.RequestLogDetailDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload>
          }
          update: {
            args: Prisma.RequestLogDetailUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload>
          }
          deleteMany: {
            args: Prisma.RequestLogDetailDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestLogDetailUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestLogDetailUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload>[]
          }
          upsert: {
            args: Prisma.RequestLogDetailUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogDetailPayload>
          }
          aggregate: {
            args: Prisma.RequestLogDetailAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestLogDetail>
          }
          groupBy: {
            args: Prisma.RequestLogDetailGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestLogDetailGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestLogDetailCountArgs<ExtArgs>
            result: $Utils.Optional<RequestLogDetailCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    requestLogHeader?: RequestLogHeaderOmit
    requestLogDetail?: RequestLogDetailOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model RequestLogHeader
   */

  export type AggregateRequestLogHeader = {
    _count: RequestLogHeaderCountAggregateOutputType | null
    _avg: RequestLogHeaderAvgAggregateOutputType | null
    _sum: RequestLogHeaderSumAggregateOutputType | null
    _min: RequestLogHeaderMinAggregateOutputType | null
    _max: RequestLogHeaderMaxAggregateOutputType | null
  }

  export type RequestLogHeaderAvgAggregateOutputType = {
    statusCode: number | null
    responseTime: number | null
  }

  export type RequestLogHeaderSumAggregateOutputType = {
    statusCode: number | null
    responseTime: number | null
  }

  export type RequestLogHeaderMinAggregateOutputType = {
    id: string | null
    service: string | null
    method: string | null
    path: string | null
    statusCode: number | null
    userId: string | null
    action: string | null
    responseTime: number | null
    userAgent: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type RequestLogHeaderMaxAggregateOutputType = {
    id: string | null
    service: string | null
    method: string | null
    path: string | null
    statusCode: number | null
    userId: string | null
    action: string | null
    responseTime: number | null
    userAgent: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type RequestLogHeaderCountAggregateOutputType = {
    id: number
    service: number
    method: number
    path: number
    statusCode: number
    userId: number
    action: number
    responseTime: number
    userAgent: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type RequestLogHeaderAvgAggregateInputType = {
    statusCode?: true
    responseTime?: true
  }

  export type RequestLogHeaderSumAggregateInputType = {
    statusCode?: true
    responseTime?: true
  }

  export type RequestLogHeaderMinAggregateInputType = {
    id?: true
    service?: true
    method?: true
    path?: true
    statusCode?: true
    userId?: true
    action?: true
    responseTime?: true
    userAgent?: true
    ipAddress?: true
    createdAt?: true
  }

  export type RequestLogHeaderMaxAggregateInputType = {
    id?: true
    service?: true
    method?: true
    path?: true
    statusCode?: true
    userId?: true
    action?: true
    responseTime?: true
    userAgent?: true
    ipAddress?: true
    createdAt?: true
  }

  export type RequestLogHeaderCountAggregateInputType = {
    id?: true
    service?: true
    method?: true
    path?: true
    statusCode?: true
    userId?: true
    action?: true
    responseTime?: true
    userAgent?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type RequestLogHeaderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLogHeader to aggregate.
     */
    where?: RequestLogHeaderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogHeaders to fetch.
     */
    orderBy?: RequestLogHeaderOrderByWithRelationInput | RequestLogHeaderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestLogHeaderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogHeaders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogHeaders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestLogHeaders
    **/
    _count?: true | RequestLogHeaderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestLogHeaderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestLogHeaderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestLogHeaderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestLogHeaderMaxAggregateInputType
  }

  export type GetRequestLogHeaderAggregateType<T extends RequestLogHeaderAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestLogHeader]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestLogHeader[P]>
      : GetScalarType<T[P], AggregateRequestLogHeader[P]>
  }




  export type RequestLogHeaderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestLogHeaderWhereInput
    orderBy?: RequestLogHeaderOrderByWithAggregationInput | RequestLogHeaderOrderByWithAggregationInput[]
    by: RequestLogHeaderScalarFieldEnum[] | RequestLogHeaderScalarFieldEnum
    having?: RequestLogHeaderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestLogHeaderCountAggregateInputType | true
    _avg?: RequestLogHeaderAvgAggregateInputType
    _sum?: RequestLogHeaderSumAggregateInputType
    _min?: RequestLogHeaderMinAggregateInputType
    _max?: RequestLogHeaderMaxAggregateInputType
  }

  export type RequestLogHeaderGroupByOutputType = {
    id: string
    service: string
    method: string
    path: string
    statusCode: number | null
    userId: string | null
    action: string | null
    responseTime: number | null
    userAgent: string | null
    ipAddress: string | null
    createdAt: Date
    _count: RequestLogHeaderCountAggregateOutputType | null
    _avg: RequestLogHeaderAvgAggregateOutputType | null
    _sum: RequestLogHeaderSumAggregateOutputType | null
    _min: RequestLogHeaderMinAggregateOutputType | null
    _max: RequestLogHeaderMaxAggregateOutputType | null
  }

  type GetRequestLogHeaderGroupByPayload<T extends RequestLogHeaderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestLogHeaderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestLogHeaderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestLogHeaderGroupByOutputType[P]>
            : GetScalarType<T[P], RequestLogHeaderGroupByOutputType[P]>
        }
      >
    >


  export type RequestLogHeaderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    service?: boolean
    method?: boolean
    path?: boolean
    statusCode?: boolean
    userId?: boolean
    action?: boolean
    responseTime?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    detail?: boolean | RequestLogHeader$detailArgs<ExtArgs>
  }, ExtArgs["result"]["requestLogHeader"]>

  export type RequestLogHeaderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    service?: boolean
    method?: boolean
    path?: boolean
    statusCode?: boolean
    userId?: boolean
    action?: boolean
    responseTime?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["requestLogHeader"]>

  export type RequestLogHeaderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    service?: boolean
    method?: boolean
    path?: boolean
    statusCode?: boolean
    userId?: boolean
    action?: boolean
    responseTime?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["requestLogHeader"]>

  export type RequestLogHeaderSelectScalar = {
    id?: boolean
    service?: boolean
    method?: boolean
    path?: boolean
    statusCode?: boolean
    userId?: boolean
    action?: boolean
    responseTime?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type RequestLogHeaderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "service" | "method" | "path" | "statusCode" | "userId" | "action" | "responseTime" | "userAgent" | "ipAddress" | "createdAt", ExtArgs["result"]["requestLogHeader"]>
  export type RequestLogHeaderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    detail?: boolean | RequestLogHeader$detailArgs<ExtArgs>
  }
  export type RequestLogHeaderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RequestLogHeaderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RequestLogHeaderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestLogHeader"
    objects: {
      detail: Prisma.$RequestLogDetailPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      service: string
      method: string
      path: string
      statusCode: number | null
      userId: string | null
      action: string | null
      responseTime: number | null
      userAgent: string | null
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["requestLogHeader"]>
    composites: {}
  }

  type RequestLogHeaderGetPayload<S extends boolean | null | undefined | RequestLogHeaderDefaultArgs> = $Result.GetResult<Prisma.$RequestLogHeaderPayload, S>

  type RequestLogHeaderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestLogHeaderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestLogHeaderCountAggregateInputType | true
    }

  export interface RequestLogHeaderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestLogHeader'], meta: { name: 'RequestLogHeader' } }
    /**
     * Find zero or one RequestLogHeader that matches the filter.
     * @param {RequestLogHeaderFindUniqueArgs} args - Arguments to find a RequestLogHeader
     * @example
     * // Get one RequestLogHeader
     * const requestLogHeader = await prisma.requestLogHeader.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestLogHeaderFindUniqueArgs>(args: SelectSubset<T, RequestLogHeaderFindUniqueArgs<ExtArgs>>): Prisma__RequestLogHeaderClient<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestLogHeader that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestLogHeaderFindUniqueOrThrowArgs} args - Arguments to find a RequestLogHeader
     * @example
     * // Get one RequestLogHeader
     * const requestLogHeader = await prisma.requestLogHeader.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestLogHeaderFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestLogHeaderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestLogHeaderClient<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestLogHeader that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogHeaderFindFirstArgs} args - Arguments to find a RequestLogHeader
     * @example
     * // Get one RequestLogHeader
     * const requestLogHeader = await prisma.requestLogHeader.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestLogHeaderFindFirstArgs>(args?: SelectSubset<T, RequestLogHeaderFindFirstArgs<ExtArgs>>): Prisma__RequestLogHeaderClient<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestLogHeader that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogHeaderFindFirstOrThrowArgs} args - Arguments to find a RequestLogHeader
     * @example
     * // Get one RequestLogHeader
     * const requestLogHeader = await prisma.requestLogHeader.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestLogHeaderFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestLogHeaderFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestLogHeaderClient<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestLogHeaders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogHeaderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestLogHeaders
     * const requestLogHeaders = await prisma.requestLogHeader.findMany()
     * 
     * // Get first 10 RequestLogHeaders
     * const requestLogHeaders = await prisma.requestLogHeader.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestLogHeaderWithIdOnly = await prisma.requestLogHeader.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestLogHeaderFindManyArgs>(args?: SelectSubset<T, RequestLogHeaderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestLogHeader.
     * @param {RequestLogHeaderCreateArgs} args - Arguments to create a RequestLogHeader.
     * @example
     * // Create one RequestLogHeader
     * const RequestLogHeader = await prisma.requestLogHeader.create({
     *   data: {
     *     // ... data to create a RequestLogHeader
     *   }
     * })
     * 
     */
    create<T extends RequestLogHeaderCreateArgs>(args: SelectSubset<T, RequestLogHeaderCreateArgs<ExtArgs>>): Prisma__RequestLogHeaderClient<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestLogHeaders.
     * @param {RequestLogHeaderCreateManyArgs} args - Arguments to create many RequestLogHeaders.
     * @example
     * // Create many RequestLogHeaders
     * const requestLogHeader = await prisma.requestLogHeader.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestLogHeaderCreateManyArgs>(args?: SelectSubset<T, RequestLogHeaderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestLogHeaders and returns the data saved in the database.
     * @param {RequestLogHeaderCreateManyAndReturnArgs} args - Arguments to create many RequestLogHeaders.
     * @example
     * // Create many RequestLogHeaders
     * const requestLogHeader = await prisma.requestLogHeader.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestLogHeaders and only return the `id`
     * const requestLogHeaderWithIdOnly = await prisma.requestLogHeader.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestLogHeaderCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestLogHeaderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestLogHeader.
     * @param {RequestLogHeaderDeleteArgs} args - Arguments to delete one RequestLogHeader.
     * @example
     * // Delete one RequestLogHeader
     * const RequestLogHeader = await prisma.requestLogHeader.delete({
     *   where: {
     *     // ... filter to delete one RequestLogHeader
     *   }
     * })
     * 
     */
    delete<T extends RequestLogHeaderDeleteArgs>(args: SelectSubset<T, RequestLogHeaderDeleteArgs<ExtArgs>>): Prisma__RequestLogHeaderClient<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestLogHeader.
     * @param {RequestLogHeaderUpdateArgs} args - Arguments to update one RequestLogHeader.
     * @example
     * // Update one RequestLogHeader
     * const requestLogHeader = await prisma.requestLogHeader.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestLogHeaderUpdateArgs>(args: SelectSubset<T, RequestLogHeaderUpdateArgs<ExtArgs>>): Prisma__RequestLogHeaderClient<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestLogHeaders.
     * @param {RequestLogHeaderDeleteManyArgs} args - Arguments to filter RequestLogHeaders to delete.
     * @example
     * // Delete a few RequestLogHeaders
     * const { count } = await prisma.requestLogHeader.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestLogHeaderDeleteManyArgs>(args?: SelectSubset<T, RequestLogHeaderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestLogHeaders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogHeaderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestLogHeaders
     * const requestLogHeader = await prisma.requestLogHeader.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestLogHeaderUpdateManyArgs>(args: SelectSubset<T, RequestLogHeaderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestLogHeaders and returns the data updated in the database.
     * @param {RequestLogHeaderUpdateManyAndReturnArgs} args - Arguments to update many RequestLogHeaders.
     * @example
     * // Update many RequestLogHeaders
     * const requestLogHeader = await prisma.requestLogHeader.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestLogHeaders and only return the `id`
     * const requestLogHeaderWithIdOnly = await prisma.requestLogHeader.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestLogHeaderUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestLogHeaderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestLogHeader.
     * @param {RequestLogHeaderUpsertArgs} args - Arguments to update or create a RequestLogHeader.
     * @example
     * // Update or create a RequestLogHeader
     * const requestLogHeader = await prisma.requestLogHeader.upsert({
     *   create: {
     *     // ... data to create a RequestLogHeader
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestLogHeader we want to update
     *   }
     * })
     */
    upsert<T extends RequestLogHeaderUpsertArgs>(args: SelectSubset<T, RequestLogHeaderUpsertArgs<ExtArgs>>): Prisma__RequestLogHeaderClient<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestLogHeaders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogHeaderCountArgs} args - Arguments to filter RequestLogHeaders to count.
     * @example
     * // Count the number of RequestLogHeaders
     * const count = await prisma.requestLogHeader.count({
     *   where: {
     *     // ... the filter for the RequestLogHeaders we want to count
     *   }
     * })
    **/
    count<T extends RequestLogHeaderCountArgs>(
      args?: Subset<T, RequestLogHeaderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestLogHeaderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestLogHeader.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogHeaderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestLogHeaderAggregateArgs>(args: Subset<T, RequestLogHeaderAggregateArgs>): Prisma.PrismaPromise<GetRequestLogHeaderAggregateType<T>>

    /**
     * Group by RequestLogHeader.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogHeaderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestLogHeaderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestLogHeaderGroupByArgs['orderBy'] }
        : { orderBy?: RequestLogHeaderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestLogHeaderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestLogHeaderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestLogHeader model
   */
  readonly fields: RequestLogHeaderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestLogHeader.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestLogHeaderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    detail<T extends RequestLogHeader$detailArgs<ExtArgs> = {}>(args?: Subset<T, RequestLogHeader$detailArgs<ExtArgs>>): Prisma__RequestLogDetailClient<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestLogHeader model
   */
  interface RequestLogHeaderFieldRefs {
    readonly id: FieldRef<"RequestLogHeader", 'String'>
    readonly service: FieldRef<"RequestLogHeader", 'String'>
    readonly method: FieldRef<"RequestLogHeader", 'String'>
    readonly path: FieldRef<"RequestLogHeader", 'String'>
    readonly statusCode: FieldRef<"RequestLogHeader", 'Int'>
    readonly userId: FieldRef<"RequestLogHeader", 'String'>
    readonly action: FieldRef<"RequestLogHeader", 'String'>
    readonly responseTime: FieldRef<"RequestLogHeader", 'Int'>
    readonly userAgent: FieldRef<"RequestLogHeader", 'String'>
    readonly ipAddress: FieldRef<"RequestLogHeader", 'String'>
    readonly createdAt: FieldRef<"RequestLogHeader", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestLogHeader findUnique
   */
  export type RequestLogHeaderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogHeader to fetch.
     */
    where: RequestLogHeaderWhereUniqueInput
  }

  /**
   * RequestLogHeader findUniqueOrThrow
   */
  export type RequestLogHeaderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogHeader to fetch.
     */
    where: RequestLogHeaderWhereUniqueInput
  }

  /**
   * RequestLogHeader findFirst
   */
  export type RequestLogHeaderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogHeader to fetch.
     */
    where?: RequestLogHeaderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogHeaders to fetch.
     */
    orderBy?: RequestLogHeaderOrderByWithRelationInput | RequestLogHeaderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogHeaders.
     */
    cursor?: RequestLogHeaderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogHeaders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogHeaders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogHeaders.
     */
    distinct?: RequestLogHeaderScalarFieldEnum | RequestLogHeaderScalarFieldEnum[]
  }

  /**
   * RequestLogHeader findFirstOrThrow
   */
  export type RequestLogHeaderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogHeader to fetch.
     */
    where?: RequestLogHeaderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogHeaders to fetch.
     */
    orderBy?: RequestLogHeaderOrderByWithRelationInput | RequestLogHeaderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogHeaders.
     */
    cursor?: RequestLogHeaderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogHeaders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogHeaders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogHeaders.
     */
    distinct?: RequestLogHeaderScalarFieldEnum | RequestLogHeaderScalarFieldEnum[]
  }

  /**
   * RequestLogHeader findMany
   */
  export type RequestLogHeaderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogHeaders to fetch.
     */
    where?: RequestLogHeaderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogHeaders to fetch.
     */
    orderBy?: RequestLogHeaderOrderByWithRelationInput | RequestLogHeaderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestLogHeaders.
     */
    cursor?: RequestLogHeaderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogHeaders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogHeaders.
     */
    skip?: number
    distinct?: RequestLogHeaderScalarFieldEnum | RequestLogHeaderScalarFieldEnum[]
  }

  /**
   * RequestLogHeader create
   */
  export type RequestLogHeaderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestLogHeader.
     */
    data: XOR<RequestLogHeaderCreateInput, RequestLogHeaderUncheckedCreateInput>
  }

  /**
   * RequestLogHeader createMany
   */
  export type RequestLogHeaderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestLogHeaders.
     */
    data: RequestLogHeaderCreateManyInput | RequestLogHeaderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestLogHeader createManyAndReturn
   */
  export type RequestLogHeaderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * The data used to create many RequestLogHeaders.
     */
    data: RequestLogHeaderCreateManyInput | RequestLogHeaderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestLogHeader update
   */
  export type RequestLogHeaderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestLogHeader.
     */
    data: XOR<RequestLogHeaderUpdateInput, RequestLogHeaderUncheckedUpdateInput>
    /**
     * Choose, which RequestLogHeader to update.
     */
    where: RequestLogHeaderWhereUniqueInput
  }

  /**
   * RequestLogHeader updateMany
   */
  export type RequestLogHeaderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestLogHeaders.
     */
    data: XOR<RequestLogHeaderUpdateManyMutationInput, RequestLogHeaderUncheckedUpdateManyInput>
    /**
     * Filter which RequestLogHeaders to update
     */
    where?: RequestLogHeaderWhereInput
    /**
     * Limit how many RequestLogHeaders to update.
     */
    limit?: number
  }

  /**
   * RequestLogHeader updateManyAndReturn
   */
  export type RequestLogHeaderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * The data used to update RequestLogHeaders.
     */
    data: XOR<RequestLogHeaderUpdateManyMutationInput, RequestLogHeaderUncheckedUpdateManyInput>
    /**
     * Filter which RequestLogHeaders to update
     */
    where?: RequestLogHeaderWhereInput
    /**
     * Limit how many RequestLogHeaders to update.
     */
    limit?: number
  }

  /**
   * RequestLogHeader upsert
   */
  export type RequestLogHeaderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestLogHeader to update in case it exists.
     */
    where: RequestLogHeaderWhereUniqueInput
    /**
     * In case the RequestLogHeader found by the `where` argument doesn't exist, create a new RequestLogHeader with this data.
     */
    create: XOR<RequestLogHeaderCreateInput, RequestLogHeaderUncheckedCreateInput>
    /**
     * In case the RequestLogHeader was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestLogHeaderUpdateInput, RequestLogHeaderUncheckedUpdateInput>
  }

  /**
   * RequestLogHeader delete
   */
  export type RequestLogHeaderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
    /**
     * Filter which RequestLogHeader to delete.
     */
    where: RequestLogHeaderWhereUniqueInput
  }

  /**
   * RequestLogHeader deleteMany
   */
  export type RequestLogHeaderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLogHeaders to delete
     */
    where?: RequestLogHeaderWhereInput
    /**
     * Limit how many RequestLogHeaders to delete.
     */
    limit?: number
  }

  /**
   * RequestLogHeader.detail
   */
  export type RequestLogHeader$detailArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    where?: RequestLogDetailWhereInput
  }

  /**
   * RequestLogHeader without action
   */
  export type RequestLogHeaderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogHeader
     */
    select?: RequestLogHeaderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogHeader
     */
    omit?: RequestLogHeaderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogHeaderInclude<ExtArgs> | null
  }


  /**
   * Model RequestLogDetail
   */

  export type AggregateRequestLogDetail = {
    _count: RequestLogDetailCountAggregateOutputType | null
    _min: RequestLogDetailMinAggregateOutputType | null
    _max: RequestLogDetailMaxAggregateOutputType | null
  }

  export type RequestLogDetailMinAggregateOutputType = {
    id: string | null
    headerId: string | null
    exceptionMessage: string | null
    stackTrace: string | null
  }

  export type RequestLogDetailMaxAggregateOutputType = {
    id: string | null
    headerId: string | null
    exceptionMessage: string | null
    stackTrace: string | null
  }

  export type RequestLogDetailCountAggregateOutputType = {
    id: number
    headerId: number
    requestBody: number
    responseBody: number
    exceptionMessage: number
    stackTrace: number
    _all: number
  }


  export type RequestLogDetailMinAggregateInputType = {
    id?: true
    headerId?: true
    exceptionMessage?: true
    stackTrace?: true
  }

  export type RequestLogDetailMaxAggregateInputType = {
    id?: true
    headerId?: true
    exceptionMessage?: true
    stackTrace?: true
  }

  export type RequestLogDetailCountAggregateInputType = {
    id?: true
    headerId?: true
    requestBody?: true
    responseBody?: true
    exceptionMessage?: true
    stackTrace?: true
    _all?: true
  }

  export type RequestLogDetailAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLogDetail to aggregate.
     */
    where?: RequestLogDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogDetails to fetch.
     */
    orderBy?: RequestLogDetailOrderByWithRelationInput | RequestLogDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestLogDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestLogDetails
    **/
    _count?: true | RequestLogDetailCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestLogDetailMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestLogDetailMaxAggregateInputType
  }

  export type GetRequestLogDetailAggregateType<T extends RequestLogDetailAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestLogDetail]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestLogDetail[P]>
      : GetScalarType<T[P], AggregateRequestLogDetail[P]>
  }




  export type RequestLogDetailGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestLogDetailWhereInput
    orderBy?: RequestLogDetailOrderByWithAggregationInput | RequestLogDetailOrderByWithAggregationInput[]
    by: RequestLogDetailScalarFieldEnum[] | RequestLogDetailScalarFieldEnum
    having?: RequestLogDetailScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestLogDetailCountAggregateInputType | true
    _min?: RequestLogDetailMinAggregateInputType
    _max?: RequestLogDetailMaxAggregateInputType
  }

  export type RequestLogDetailGroupByOutputType = {
    id: string
    headerId: string
    requestBody: JsonValue | null
    responseBody: JsonValue | null
    exceptionMessage: string | null
    stackTrace: string | null
    _count: RequestLogDetailCountAggregateOutputType | null
    _min: RequestLogDetailMinAggregateOutputType | null
    _max: RequestLogDetailMaxAggregateOutputType | null
  }

  type GetRequestLogDetailGroupByPayload<T extends RequestLogDetailGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestLogDetailGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestLogDetailGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestLogDetailGroupByOutputType[P]>
            : GetScalarType<T[P], RequestLogDetailGroupByOutputType[P]>
        }
      >
    >


  export type RequestLogDetailSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    headerId?: boolean
    requestBody?: boolean
    responseBody?: boolean
    exceptionMessage?: boolean
    stackTrace?: boolean
    header?: boolean | RequestLogHeaderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestLogDetail"]>

  export type RequestLogDetailSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    headerId?: boolean
    requestBody?: boolean
    responseBody?: boolean
    exceptionMessage?: boolean
    stackTrace?: boolean
    header?: boolean | RequestLogHeaderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestLogDetail"]>

  export type RequestLogDetailSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    headerId?: boolean
    requestBody?: boolean
    responseBody?: boolean
    exceptionMessage?: boolean
    stackTrace?: boolean
    header?: boolean | RequestLogHeaderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestLogDetail"]>

  export type RequestLogDetailSelectScalar = {
    id?: boolean
    headerId?: boolean
    requestBody?: boolean
    responseBody?: boolean
    exceptionMessage?: boolean
    stackTrace?: boolean
  }

  export type RequestLogDetailOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "headerId" | "requestBody" | "responseBody" | "exceptionMessage" | "stackTrace", ExtArgs["result"]["requestLogDetail"]>
  export type RequestLogDetailInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    header?: boolean | RequestLogHeaderDefaultArgs<ExtArgs>
  }
  export type RequestLogDetailIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    header?: boolean | RequestLogHeaderDefaultArgs<ExtArgs>
  }
  export type RequestLogDetailIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    header?: boolean | RequestLogHeaderDefaultArgs<ExtArgs>
  }

  export type $RequestLogDetailPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestLogDetail"
    objects: {
      header: Prisma.$RequestLogHeaderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      headerId: string
      requestBody: Prisma.JsonValue | null
      responseBody: Prisma.JsonValue | null
      exceptionMessage: string | null
      stackTrace: string | null
    }, ExtArgs["result"]["requestLogDetail"]>
    composites: {}
  }

  type RequestLogDetailGetPayload<S extends boolean | null | undefined | RequestLogDetailDefaultArgs> = $Result.GetResult<Prisma.$RequestLogDetailPayload, S>

  type RequestLogDetailCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestLogDetailFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestLogDetailCountAggregateInputType | true
    }

  export interface RequestLogDetailDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestLogDetail'], meta: { name: 'RequestLogDetail' } }
    /**
     * Find zero or one RequestLogDetail that matches the filter.
     * @param {RequestLogDetailFindUniqueArgs} args - Arguments to find a RequestLogDetail
     * @example
     * // Get one RequestLogDetail
     * const requestLogDetail = await prisma.requestLogDetail.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestLogDetailFindUniqueArgs>(args: SelectSubset<T, RequestLogDetailFindUniqueArgs<ExtArgs>>): Prisma__RequestLogDetailClient<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestLogDetail that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestLogDetailFindUniqueOrThrowArgs} args - Arguments to find a RequestLogDetail
     * @example
     * // Get one RequestLogDetail
     * const requestLogDetail = await prisma.requestLogDetail.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestLogDetailFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestLogDetailFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestLogDetailClient<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestLogDetail that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogDetailFindFirstArgs} args - Arguments to find a RequestLogDetail
     * @example
     * // Get one RequestLogDetail
     * const requestLogDetail = await prisma.requestLogDetail.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestLogDetailFindFirstArgs>(args?: SelectSubset<T, RequestLogDetailFindFirstArgs<ExtArgs>>): Prisma__RequestLogDetailClient<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestLogDetail that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogDetailFindFirstOrThrowArgs} args - Arguments to find a RequestLogDetail
     * @example
     * // Get one RequestLogDetail
     * const requestLogDetail = await prisma.requestLogDetail.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestLogDetailFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestLogDetailFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestLogDetailClient<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestLogDetails that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogDetailFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestLogDetails
     * const requestLogDetails = await prisma.requestLogDetail.findMany()
     * 
     * // Get first 10 RequestLogDetails
     * const requestLogDetails = await prisma.requestLogDetail.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestLogDetailWithIdOnly = await prisma.requestLogDetail.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestLogDetailFindManyArgs>(args?: SelectSubset<T, RequestLogDetailFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestLogDetail.
     * @param {RequestLogDetailCreateArgs} args - Arguments to create a RequestLogDetail.
     * @example
     * // Create one RequestLogDetail
     * const RequestLogDetail = await prisma.requestLogDetail.create({
     *   data: {
     *     // ... data to create a RequestLogDetail
     *   }
     * })
     * 
     */
    create<T extends RequestLogDetailCreateArgs>(args: SelectSubset<T, RequestLogDetailCreateArgs<ExtArgs>>): Prisma__RequestLogDetailClient<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestLogDetails.
     * @param {RequestLogDetailCreateManyArgs} args - Arguments to create many RequestLogDetails.
     * @example
     * // Create many RequestLogDetails
     * const requestLogDetail = await prisma.requestLogDetail.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestLogDetailCreateManyArgs>(args?: SelectSubset<T, RequestLogDetailCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestLogDetails and returns the data saved in the database.
     * @param {RequestLogDetailCreateManyAndReturnArgs} args - Arguments to create many RequestLogDetails.
     * @example
     * // Create many RequestLogDetails
     * const requestLogDetail = await prisma.requestLogDetail.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestLogDetails and only return the `id`
     * const requestLogDetailWithIdOnly = await prisma.requestLogDetail.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestLogDetailCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestLogDetailCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestLogDetail.
     * @param {RequestLogDetailDeleteArgs} args - Arguments to delete one RequestLogDetail.
     * @example
     * // Delete one RequestLogDetail
     * const RequestLogDetail = await prisma.requestLogDetail.delete({
     *   where: {
     *     // ... filter to delete one RequestLogDetail
     *   }
     * })
     * 
     */
    delete<T extends RequestLogDetailDeleteArgs>(args: SelectSubset<T, RequestLogDetailDeleteArgs<ExtArgs>>): Prisma__RequestLogDetailClient<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestLogDetail.
     * @param {RequestLogDetailUpdateArgs} args - Arguments to update one RequestLogDetail.
     * @example
     * // Update one RequestLogDetail
     * const requestLogDetail = await prisma.requestLogDetail.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestLogDetailUpdateArgs>(args: SelectSubset<T, RequestLogDetailUpdateArgs<ExtArgs>>): Prisma__RequestLogDetailClient<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestLogDetails.
     * @param {RequestLogDetailDeleteManyArgs} args - Arguments to filter RequestLogDetails to delete.
     * @example
     * // Delete a few RequestLogDetails
     * const { count } = await prisma.requestLogDetail.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestLogDetailDeleteManyArgs>(args?: SelectSubset<T, RequestLogDetailDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestLogDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogDetailUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestLogDetails
     * const requestLogDetail = await prisma.requestLogDetail.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestLogDetailUpdateManyArgs>(args: SelectSubset<T, RequestLogDetailUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestLogDetails and returns the data updated in the database.
     * @param {RequestLogDetailUpdateManyAndReturnArgs} args - Arguments to update many RequestLogDetails.
     * @example
     * // Update many RequestLogDetails
     * const requestLogDetail = await prisma.requestLogDetail.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestLogDetails and only return the `id`
     * const requestLogDetailWithIdOnly = await prisma.requestLogDetail.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestLogDetailUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestLogDetailUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestLogDetail.
     * @param {RequestLogDetailUpsertArgs} args - Arguments to update or create a RequestLogDetail.
     * @example
     * // Update or create a RequestLogDetail
     * const requestLogDetail = await prisma.requestLogDetail.upsert({
     *   create: {
     *     // ... data to create a RequestLogDetail
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestLogDetail we want to update
     *   }
     * })
     */
    upsert<T extends RequestLogDetailUpsertArgs>(args: SelectSubset<T, RequestLogDetailUpsertArgs<ExtArgs>>): Prisma__RequestLogDetailClient<$Result.GetResult<Prisma.$RequestLogDetailPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestLogDetails.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogDetailCountArgs} args - Arguments to filter RequestLogDetails to count.
     * @example
     * // Count the number of RequestLogDetails
     * const count = await prisma.requestLogDetail.count({
     *   where: {
     *     // ... the filter for the RequestLogDetails we want to count
     *   }
     * })
    **/
    count<T extends RequestLogDetailCountArgs>(
      args?: Subset<T, RequestLogDetailCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestLogDetailCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestLogDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogDetailAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestLogDetailAggregateArgs>(args: Subset<T, RequestLogDetailAggregateArgs>): Prisma.PrismaPromise<GetRequestLogDetailAggregateType<T>>

    /**
     * Group by RequestLogDetail.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogDetailGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestLogDetailGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestLogDetailGroupByArgs['orderBy'] }
        : { orderBy?: RequestLogDetailGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestLogDetailGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestLogDetailGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestLogDetail model
   */
  readonly fields: RequestLogDetailFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestLogDetail.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestLogDetailClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    header<T extends RequestLogHeaderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RequestLogHeaderDefaultArgs<ExtArgs>>): Prisma__RequestLogHeaderClient<$Result.GetResult<Prisma.$RequestLogHeaderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestLogDetail model
   */
  interface RequestLogDetailFieldRefs {
    readonly id: FieldRef<"RequestLogDetail", 'String'>
    readonly headerId: FieldRef<"RequestLogDetail", 'String'>
    readonly requestBody: FieldRef<"RequestLogDetail", 'Json'>
    readonly responseBody: FieldRef<"RequestLogDetail", 'Json'>
    readonly exceptionMessage: FieldRef<"RequestLogDetail", 'String'>
    readonly stackTrace: FieldRef<"RequestLogDetail", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RequestLogDetail findUnique
   */
  export type RequestLogDetailFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogDetail to fetch.
     */
    where: RequestLogDetailWhereUniqueInput
  }

  /**
   * RequestLogDetail findUniqueOrThrow
   */
  export type RequestLogDetailFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogDetail to fetch.
     */
    where: RequestLogDetailWhereUniqueInput
  }

  /**
   * RequestLogDetail findFirst
   */
  export type RequestLogDetailFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogDetail to fetch.
     */
    where?: RequestLogDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogDetails to fetch.
     */
    orderBy?: RequestLogDetailOrderByWithRelationInput | RequestLogDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogDetails.
     */
    cursor?: RequestLogDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogDetails.
     */
    distinct?: RequestLogDetailScalarFieldEnum | RequestLogDetailScalarFieldEnum[]
  }

  /**
   * RequestLogDetail findFirstOrThrow
   */
  export type RequestLogDetailFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogDetail to fetch.
     */
    where?: RequestLogDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogDetails to fetch.
     */
    orderBy?: RequestLogDetailOrderByWithRelationInput | RequestLogDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogDetails.
     */
    cursor?: RequestLogDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogDetails.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogDetails.
     */
    distinct?: RequestLogDetailScalarFieldEnum | RequestLogDetailScalarFieldEnum[]
  }

  /**
   * RequestLogDetail findMany
   */
  export type RequestLogDetailFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogDetails to fetch.
     */
    where?: RequestLogDetailWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogDetails to fetch.
     */
    orderBy?: RequestLogDetailOrderByWithRelationInput | RequestLogDetailOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestLogDetails.
     */
    cursor?: RequestLogDetailWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogDetails from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogDetails.
     */
    skip?: number
    distinct?: RequestLogDetailScalarFieldEnum | RequestLogDetailScalarFieldEnum[]
  }

  /**
   * RequestLogDetail create
   */
  export type RequestLogDetailCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestLogDetail.
     */
    data: XOR<RequestLogDetailCreateInput, RequestLogDetailUncheckedCreateInput>
  }

  /**
   * RequestLogDetail createMany
   */
  export type RequestLogDetailCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestLogDetails.
     */
    data: RequestLogDetailCreateManyInput | RequestLogDetailCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestLogDetail createManyAndReturn
   */
  export type RequestLogDetailCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * The data used to create many RequestLogDetails.
     */
    data: RequestLogDetailCreateManyInput | RequestLogDetailCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestLogDetail update
   */
  export type RequestLogDetailUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestLogDetail.
     */
    data: XOR<RequestLogDetailUpdateInput, RequestLogDetailUncheckedUpdateInput>
    /**
     * Choose, which RequestLogDetail to update.
     */
    where: RequestLogDetailWhereUniqueInput
  }

  /**
   * RequestLogDetail updateMany
   */
  export type RequestLogDetailUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestLogDetails.
     */
    data: XOR<RequestLogDetailUpdateManyMutationInput, RequestLogDetailUncheckedUpdateManyInput>
    /**
     * Filter which RequestLogDetails to update
     */
    where?: RequestLogDetailWhereInput
    /**
     * Limit how many RequestLogDetails to update.
     */
    limit?: number
  }

  /**
   * RequestLogDetail updateManyAndReturn
   */
  export type RequestLogDetailUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * The data used to update RequestLogDetails.
     */
    data: XOR<RequestLogDetailUpdateManyMutationInput, RequestLogDetailUncheckedUpdateManyInput>
    /**
     * Filter which RequestLogDetails to update
     */
    where?: RequestLogDetailWhereInput
    /**
     * Limit how many RequestLogDetails to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestLogDetail upsert
   */
  export type RequestLogDetailUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestLogDetail to update in case it exists.
     */
    where: RequestLogDetailWhereUniqueInput
    /**
     * In case the RequestLogDetail found by the `where` argument doesn't exist, create a new RequestLogDetail with this data.
     */
    create: XOR<RequestLogDetailCreateInput, RequestLogDetailUncheckedCreateInput>
    /**
     * In case the RequestLogDetail was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestLogDetailUpdateInput, RequestLogDetailUncheckedUpdateInput>
  }

  /**
   * RequestLogDetail delete
   */
  export type RequestLogDetailDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
    /**
     * Filter which RequestLogDetail to delete.
     */
    where: RequestLogDetailWhereUniqueInput
  }

  /**
   * RequestLogDetail deleteMany
   */
  export type RequestLogDetailDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLogDetails to delete
     */
    where?: RequestLogDetailWhereInput
    /**
     * Limit how many RequestLogDetails to delete.
     */
    limit?: number
  }

  /**
   * RequestLogDetail without action
   */
  export type RequestLogDetailDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogDetail
     */
    select?: RequestLogDetailSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLogDetail
     */
    omit?: RequestLogDetailOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogDetailInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RequestLogHeaderScalarFieldEnum: {
    id: 'id',
    service: 'service',
    method: 'method',
    path: 'path',
    statusCode: 'statusCode',
    userId: 'userId',
    action: 'action',
    responseTime: 'responseTime',
    userAgent: 'userAgent',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type RequestLogHeaderScalarFieldEnum = (typeof RequestLogHeaderScalarFieldEnum)[keyof typeof RequestLogHeaderScalarFieldEnum]


  export const RequestLogDetailScalarFieldEnum: {
    id: 'id',
    headerId: 'headerId',
    requestBody: 'requestBody',
    responseBody: 'responseBody',
    exceptionMessage: 'exceptionMessage',
    stackTrace: 'stackTrace'
  };

  export type RequestLogDetailScalarFieldEnum = (typeof RequestLogDetailScalarFieldEnum)[keyof typeof RequestLogDetailScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type RequestLogHeaderWhereInput = {
    AND?: RequestLogHeaderWhereInput | RequestLogHeaderWhereInput[]
    OR?: RequestLogHeaderWhereInput[]
    NOT?: RequestLogHeaderWhereInput | RequestLogHeaderWhereInput[]
    id?: StringFilter<"RequestLogHeader"> | string
    service?: StringFilter<"RequestLogHeader"> | string
    method?: StringFilter<"RequestLogHeader"> | string
    path?: StringFilter<"RequestLogHeader"> | string
    statusCode?: IntNullableFilter<"RequestLogHeader"> | number | null
    userId?: StringNullableFilter<"RequestLogHeader"> | string | null
    action?: StringNullableFilter<"RequestLogHeader"> | string | null
    responseTime?: IntNullableFilter<"RequestLogHeader"> | number | null
    userAgent?: StringNullableFilter<"RequestLogHeader"> | string | null
    ipAddress?: StringNullableFilter<"RequestLogHeader"> | string | null
    createdAt?: DateTimeFilter<"RequestLogHeader"> | Date | string
    detail?: XOR<RequestLogDetailNullableScalarRelationFilter, RequestLogDetailWhereInput> | null
  }

  export type RequestLogHeaderOrderByWithRelationInput = {
    id?: SortOrder
    service?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrderInput | SortOrder
    responseTime?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    detail?: RequestLogDetailOrderByWithRelationInput
  }

  export type RequestLogHeaderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RequestLogHeaderWhereInput | RequestLogHeaderWhereInput[]
    OR?: RequestLogHeaderWhereInput[]
    NOT?: RequestLogHeaderWhereInput | RequestLogHeaderWhereInput[]
    service?: StringFilter<"RequestLogHeader"> | string
    method?: StringFilter<"RequestLogHeader"> | string
    path?: StringFilter<"RequestLogHeader"> | string
    statusCode?: IntNullableFilter<"RequestLogHeader"> | number | null
    userId?: StringNullableFilter<"RequestLogHeader"> | string | null
    action?: StringNullableFilter<"RequestLogHeader"> | string | null
    responseTime?: IntNullableFilter<"RequestLogHeader"> | number | null
    userAgent?: StringNullableFilter<"RequestLogHeader"> | string | null
    ipAddress?: StringNullableFilter<"RequestLogHeader"> | string | null
    createdAt?: DateTimeFilter<"RequestLogHeader"> | Date | string
    detail?: XOR<RequestLogDetailNullableScalarRelationFilter, RequestLogDetailWhereInput> | null
  }, "id">

  export type RequestLogHeaderOrderByWithAggregationInput = {
    id?: SortOrder
    service?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrderInput | SortOrder
    responseTime?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RequestLogHeaderCountOrderByAggregateInput
    _avg?: RequestLogHeaderAvgOrderByAggregateInput
    _max?: RequestLogHeaderMaxOrderByAggregateInput
    _min?: RequestLogHeaderMinOrderByAggregateInput
    _sum?: RequestLogHeaderSumOrderByAggregateInput
  }

  export type RequestLogHeaderScalarWhereWithAggregatesInput = {
    AND?: RequestLogHeaderScalarWhereWithAggregatesInput | RequestLogHeaderScalarWhereWithAggregatesInput[]
    OR?: RequestLogHeaderScalarWhereWithAggregatesInput[]
    NOT?: RequestLogHeaderScalarWhereWithAggregatesInput | RequestLogHeaderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequestLogHeader"> | string
    service?: StringWithAggregatesFilter<"RequestLogHeader"> | string
    method?: StringWithAggregatesFilter<"RequestLogHeader"> | string
    path?: StringWithAggregatesFilter<"RequestLogHeader"> | string
    statusCode?: IntNullableWithAggregatesFilter<"RequestLogHeader"> | number | null
    userId?: StringNullableWithAggregatesFilter<"RequestLogHeader"> | string | null
    action?: StringNullableWithAggregatesFilter<"RequestLogHeader"> | string | null
    responseTime?: IntNullableWithAggregatesFilter<"RequestLogHeader"> | number | null
    userAgent?: StringNullableWithAggregatesFilter<"RequestLogHeader"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"RequestLogHeader"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RequestLogHeader"> | Date | string
  }

  export type RequestLogDetailWhereInput = {
    AND?: RequestLogDetailWhereInput | RequestLogDetailWhereInput[]
    OR?: RequestLogDetailWhereInput[]
    NOT?: RequestLogDetailWhereInput | RequestLogDetailWhereInput[]
    id?: StringFilter<"RequestLogDetail"> | string
    headerId?: StringFilter<"RequestLogDetail"> | string
    requestBody?: JsonNullableFilter<"RequestLogDetail">
    responseBody?: JsonNullableFilter<"RequestLogDetail">
    exceptionMessage?: StringNullableFilter<"RequestLogDetail"> | string | null
    stackTrace?: StringNullableFilter<"RequestLogDetail"> | string | null
    header?: XOR<RequestLogHeaderScalarRelationFilter, RequestLogHeaderWhereInput>
  }

  export type RequestLogDetailOrderByWithRelationInput = {
    id?: SortOrder
    headerId?: SortOrder
    requestBody?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    exceptionMessage?: SortOrderInput | SortOrder
    stackTrace?: SortOrderInput | SortOrder
    header?: RequestLogHeaderOrderByWithRelationInput
  }

  export type RequestLogDetailWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    headerId?: string
    AND?: RequestLogDetailWhereInput | RequestLogDetailWhereInput[]
    OR?: RequestLogDetailWhereInput[]
    NOT?: RequestLogDetailWhereInput | RequestLogDetailWhereInput[]
    requestBody?: JsonNullableFilter<"RequestLogDetail">
    responseBody?: JsonNullableFilter<"RequestLogDetail">
    exceptionMessage?: StringNullableFilter<"RequestLogDetail"> | string | null
    stackTrace?: StringNullableFilter<"RequestLogDetail"> | string | null
    header?: XOR<RequestLogHeaderScalarRelationFilter, RequestLogHeaderWhereInput>
  }, "id" | "headerId">

  export type RequestLogDetailOrderByWithAggregationInput = {
    id?: SortOrder
    headerId?: SortOrder
    requestBody?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    exceptionMessage?: SortOrderInput | SortOrder
    stackTrace?: SortOrderInput | SortOrder
    _count?: RequestLogDetailCountOrderByAggregateInput
    _max?: RequestLogDetailMaxOrderByAggregateInput
    _min?: RequestLogDetailMinOrderByAggregateInput
  }

  export type RequestLogDetailScalarWhereWithAggregatesInput = {
    AND?: RequestLogDetailScalarWhereWithAggregatesInput | RequestLogDetailScalarWhereWithAggregatesInput[]
    OR?: RequestLogDetailScalarWhereWithAggregatesInput[]
    NOT?: RequestLogDetailScalarWhereWithAggregatesInput | RequestLogDetailScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequestLogDetail"> | string
    headerId?: StringWithAggregatesFilter<"RequestLogDetail"> | string
    requestBody?: JsonNullableWithAggregatesFilter<"RequestLogDetail">
    responseBody?: JsonNullableWithAggregatesFilter<"RequestLogDetail">
    exceptionMessage?: StringNullableWithAggregatesFilter<"RequestLogDetail"> | string | null
    stackTrace?: StringNullableWithAggregatesFilter<"RequestLogDetail"> | string | null
  }

  export type RequestLogHeaderCreateInput = {
    id?: string
    service: string
    method: string
    path: string
    statusCode?: number | null
    userId?: string | null
    action?: string | null
    responseTime?: number | null
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    detail?: RequestLogDetailCreateNestedOneWithoutHeaderInput
  }

  export type RequestLogHeaderUncheckedCreateInput = {
    id?: string
    service: string
    method: string
    path: string
    statusCode?: number | null
    userId?: string | null
    action?: string | null
    responseTime?: number | null
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
    detail?: RequestLogDetailUncheckedCreateNestedOneWithoutHeaderInput
  }

  export type RequestLogHeaderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: RequestLogDetailUpdateOneWithoutHeaderNestedInput
  }

  export type RequestLogHeaderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: RequestLogDetailUncheckedUpdateOneWithoutHeaderNestedInput
  }

  export type RequestLogHeaderCreateManyInput = {
    id?: string
    service: string
    method: string
    path: string
    statusCode?: number | null
    userId?: string | null
    action?: string | null
    responseTime?: number | null
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type RequestLogHeaderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogHeaderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogDetailCreateInput = {
    id?: string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: string | null
    stackTrace?: string | null
    header: RequestLogHeaderCreateNestedOneWithoutDetailInput
  }

  export type RequestLogDetailUncheckedCreateInput = {
    id?: string
    headerId: string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: string | null
    stackTrace?: string | null
  }

  export type RequestLogDetailUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: NullableStringFieldUpdateOperationsInput | string | null
    stackTrace?: NullableStringFieldUpdateOperationsInput | string | null
    header?: RequestLogHeaderUpdateOneRequiredWithoutDetailNestedInput
  }

  export type RequestLogDetailUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    headerId?: StringFieldUpdateOperationsInput | string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: NullableStringFieldUpdateOperationsInput | string | null
    stackTrace?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RequestLogDetailCreateManyInput = {
    id?: string
    headerId: string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: string | null
    stackTrace?: string | null
  }

  export type RequestLogDetailUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: NullableStringFieldUpdateOperationsInput | string | null
    stackTrace?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RequestLogDetailUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    headerId?: StringFieldUpdateOperationsInput | string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: NullableStringFieldUpdateOperationsInput | string | null
    stackTrace?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RequestLogDetailNullableScalarRelationFilter = {
    is?: RequestLogDetailWhereInput | null
    isNot?: RequestLogDetailWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RequestLogHeaderCountOrderByAggregateInput = {
    id?: SortOrder
    service?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    responseTime?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogHeaderAvgOrderByAggregateInput = {
    statusCode?: SortOrder
    responseTime?: SortOrder
  }

  export type RequestLogHeaderMaxOrderByAggregateInput = {
    id?: SortOrder
    service?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    responseTime?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogHeaderMinOrderByAggregateInput = {
    id?: SortOrder
    service?: SortOrder
    method?: SortOrder
    path?: SortOrder
    statusCode?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    responseTime?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogHeaderSumOrderByAggregateInput = {
    statusCode?: SortOrder
    responseTime?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RequestLogHeaderScalarRelationFilter = {
    is?: RequestLogHeaderWhereInput
    isNot?: RequestLogHeaderWhereInput
  }

  export type RequestLogDetailCountOrderByAggregateInput = {
    id?: SortOrder
    headerId?: SortOrder
    requestBody?: SortOrder
    responseBody?: SortOrder
    exceptionMessage?: SortOrder
    stackTrace?: SortOrder
  }

  export type RequestLogDetailMaxOrderByAggregateInput = {
    id?: SortOrder
    headerId?: SortOrder
    exceptionMessage?: SortOrder
    stackTrace?: SortOrder
  }

  export type RequestLogDetailMinOrderByAggregateInput = {
    id?: SortOrder
    headerId?: SortOrder
    exceptionMessage?: SortOrder
    stackTrace?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type RequestLogDetailCreateNestedOneWithoutHeaderInput = {
    create?: XOR<RequestLogDetailCreateWithoutHeaderInput, RequestLogDetailUncheckedCreateWithoutHeaderInput>
    connectOrCreate?: RequestLogDetailCreateOrConnectWithoutHeaderInput
    connect?: RequestLogDetailWhereUniqueInput
  }

  export type RequestLogDetailUncheckedCreateNestedOneWithoutHeaderInput = {
    create?: XOR<RequestLogDetailCreateWithoutHeaderInput, RequestLogDetailUncheckedCreateWithoutHeaderInput>
    connectOrCreate?: RequestLogDetailCreateOrConnectWithoutHeaderInput
    connect?: RequestLogDetailWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RequestLogDetailUpdateOneWithoutHeaderNestedInput = {
    create?: XOR<RequestLogDetailCreateWithoutHeaderInput, RequestLogDetailUncheckedCreateWithoutHeaderInput>
    connectOrCreate?: RequestLogDetailCreateOrConnectWithoutHeaderInput
    upsert?: RequestLogDetailUpsertWithoutHeaderInput
    disconnect?: RequestLogDetailWhereInput | boolean
    delete?: RequestLogDetailWhereInput | boolean
    connect?: RequestLogDetailWhereUniqueInput
    update?: XOR<XOR<RequestLogDetailUpdateToOneWithWhereWithoutHeaderInput, RequestLogDetailUpdateWithoutHeaderInput>, RequestLogDetailUncheckedUpdateWithoutHeaderInput>
  }

  export type RequestLogDetailUncheckedUpdateOneWithoutHeaderNestedInput = {
    create?: XOR<RequestLogDetailCreateWithoutHeaderInput, RequestLogDetailUncheckedCreateWithoutHeaderInput>
    connectOrCreate?: RequestLogDetailCreateOrConnectWithoutHeaderInput
    upsert?: RequestLogDetailUpsertWithoutHeaderInput
    disconnect?: RequestLogDetailWhereInput | boolean
    delete?: RequestLogDetailWhereInput | boolean
    connect?: RequestLogDetailWhereUniqueInput
    update?: XOR<XOR<RequestLogDetailUpdateToOneWithWhereWithoutHeaderInput, RequestLogDetailUpdateWithoutHeaderInput>, RequestLogDetailUncheckedUpdateWithoutHeaderInput>
  }

  export type RequestLogHeaderCreateNestedOneWithoutDetailInput = {
    create?: XOR<RequestLogHeaderCreateWithoutDetailInput, RequestLogHeaderUncheckedCreateWithoutDetailInput>
    connectOrCreate?: RequestLogHeaderCreateOrConnectWithoutDetailInput
    connect?: RequestLogHeaderWhereUniqueInput
  }

  export type RequestLogHeaderUpdateOneRequiredWithoutDetailNestedInput = {
    create?: XOR<RequestLogHeaderCreateWithoutDetailInput, RequestLogHeaderUncheckedCreateWithoutDetailInput>
    connectOrCreate?: RequestLogHeaderCreateOrConnectWithoutDetailInput
    upsert?: RequestLogHeaderUpsertWithoutDetailInput
    connect?: RequestLogHeaderWhereUniqueInput
    update?: XOR<XOR<RequestLogHeaderUpdateToOneWithWhereWithoutDetailInput, RequestLogHeaderUpdateWithoutDetailInput>, RequestLogHeaderUncheckedUpdateWithoutDetailInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type RequestLogDetailCreateWithoutHeaderInput = {
    id?: string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: string | null
    stackTrace?: string | null
  }

  export type RequestLogDetailUncheckedCreateWithoutHeaderInput = {
    id?: string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: string | null
    stackTrace?: string | null
  }

  export type RequestLogDetailCreateOrConnectWithoutHeaderInput = {
    where: RequestLogDetailWhereUniqueInput
    create: XOR<RequestLogDetailCreateWithoutHeaderInput, RequestLogDetailUncheckedCreateWithoutHeaderInput>
  }

  export type RequestLogDetailUpsertWithoutHeaderInput = {
    update: XOR<RequestLogDetailUpdateWithoutHeaderInput, RequestLogDetailUncheckedUpdateWithoutHeaderInput>
    create: XOR<RequestLogDetailCreateWithoutHeaderInput, RequestLogDetailUncheckedCreateWithoutHeaderInput>
    where?: RequestLogDetailWhereInput
  }

  export type RequestLogDetailUpdateToOneWithWhereWithoutHeaderInput = {
    where?: RequestLogDetailWhereInput
    data: XOR<RequestLogDetailUpdateWithoutHeaderInput, RequestLogDetailUncheckedUpdateWithoutHeaderInput>
  }

  export type RequestLogDetailUpdateWithoutHeaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: NullableStringFieldUpdateOperationsInput | string | null
    stackTrace?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RequestLogDetailUncheckedUpdateWithoutHeaderInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestBody?: NullableJsonNullValueInput | InputJsonValue
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    exceptionMessage?: NullableStringFieldUpdateOperationsInput | string | null
    stackTrace?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RequestLogHeaderCreateWithoutDetailInput = {
    id?: string
    service: string
    method: string
    path: string
    statusCode?: number | null
    userId?: string | null
    action?: string | null
    responseTime?: number | null
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type RequestLogHeaderUncheckedCreateWithoutDetailInput = {
    id?: string
    service: string
    method: string
    path: string
    statusCode?: number | null
    userId?: string | null
    action?: string | null
    responseTime?: number | null
    userAgent?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type RequestLogHeaderCreateOrConnectWithoutDetailInput = {
    where: RequestLogHeaderWhereUniqueInput
    create: XOR<RequestLogHeaderCreateWithoutDetailInput, RequestLogHeaderUncheckedCreateWithoutDetailInput>
  }

  export type RequestLogHeaderUpsertWithoutDetailInput = {
    update: XOR<RequestLogHeaderUpdateWithoutDetailInput, RequestLogHeaderUncheckedUpdateWithoutDetailInput>
    create: XOR<RequestLogHeaderCreateWithoutDetailInput, RequestLogHeaderUncheckedCreateWithoutDetailInput>
    where?: RequestLogHeaderWhereInput
  }

  export type RequestLogHeaderUpdateToOneWithWhereWithoutDetailInput = {
    where?: RequestLogHeaderWhereInput
    data: XOR<RequestLogHeaderUpdateWithoutDetailInput, RequestLogHeaderUncheckedUpdateWithoutDetailInput>
  }

  export type RequestLogHeaderUpdateWithoutDetailInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogHeaderUncheckedUpdateWithoutDetailInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: StringFieldUpdateOperationsInput | string
    method?: StringFieldUpdateOperationsInput | string
    path?: StringFieldUpdateOperationsInput | string
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: NullableStringFieldUpdateOperationsInput | string | null
    responseTime?: NullableIntFieldUpdateOperationsInput | number | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}