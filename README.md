# freemarket_sample_62c

フリマアプリ「メルカリ」のクローンサイト
修正：追加実装
# Description

フリマアプリ「メルカリ」のクローンサイトです。

商品購入、商品の出品をすることができて、
ユーザー登録家の中にある無駄に感じている物を
簡単に売ることができますし、安く購入することができます。

# Features
・ユーザー登録フォーム
・ユーザーログイン、ログアウト
・ユーザー編集
・マイページの表示機能
・商品出品、編集、削除
・商品ステータス機能
・pay.jpによる決済処理
・商品購入機能

## Dependency

| 種別         | 名称                         |
| ---------- | -------------------------- |
| 開発言語       | Ruby(ver 2.5.2)            |
| フレームワーク    | Ruby on Rails(ver 5.0.7.2) |
| マークアップ     | HTML(Haml),CSS(Saas)       |
| フロントエンド    | Javascript(jQuery)         |
| DB         | MYSQL                      |
| 本番環境       | AWS EC2                    |
| 画像アップロード   | carrierwave, AWS S3        |
| 自動デプロイ     | capistrano                 |
| ユーザー管理     | devise                     |
| クレジットカード管理 | payJP                      |

## ER図
![Entity Relationship Diagram](https://user-images.githubusercontent.com/53609959/74335044-9ff60380-4dde-11ea-8b62-2574950ee1b8.png)


## usersテーブル

| Column          | Type    | Options                             |
| --------------- | ------- | ----------------------------------- |
| nickname        | string  | null: false,limit: 20               |
| email           | string  | null: false, unique: true           |
| password        | strinfg | null: false, unique: true           |
| first_name      | string  | null: false, limit: 30              |
| last_name       | string  | null: false, limit: 30              |
| first_name_kana | string  | null: false, limit: 30              |
| last_name_kana  | string  | null: false, limit: 30              |
| birth_year      | integer |                                     |
| birth_month     | integer |                                     |
| birth_day       | integer |                                     |
| tel             | integer | null false, limit: 30, unique: true |



### Association
- has_many :item_comments
- has_many :sns_credentials, dependent: :destory
- has_many :items, dependent: :destroy
- has_many :transactions, dependent: :destroy
- has_many :likes
- has_one  :address
- has_one  :credit_card


## addressesテーブル

| Column      | Type    | Options                         |
| ----------- | ------- | ------------------------------- |
| user_id     | integer | null : false, foreign_key: true |
| post_number | integer | null: false                     |
| prefecture  | string  | null: false                     |
| city        | string  | null: false                     |
| address     | string  | null: false                     |
| building    | string  | null: false                     |
| tel         | integer | null: false                     |

### Association
- belongs_to :user


## credit_cardsテーブル

| Column                | Type    | Options                        |
| --------------------- | ------- | ------------------------------ |
| user_id               | integer | null: false, foreign_key: true |
| expiration_date_month | integer | null: false                    |
| expiration_date_year  | integer | null: false                    |
| sequrity_code         | integer | null: false                    |

### Association
- belongs_to :user


## item_commentsテーブル

| Column  | Type    | Options                        |
| ------- | ------- | ------------------------------ |
| comment | text    | null: false                    |
| user_id | integer | null: false, foreign_key: true |
| item_id | integer | null: false, foregin_key: true |

- belongs_to :user
- belongs_to :item

### likesテーブル

| Column  | Type    | Options                        |
| ------- | ------- | ------------------------------ |
| user_id | integer | null: false, foreign_key: true |
| item_id | integer | null: false, foreign_key: true |

### Association
- belongs_to :user
- belongs_to :item

## transactionsテーブル

| Column               | Type    | Options                                        |
| -------------------- | ------- | ---------------------------------------------- |
| transaction_state_id | integer | null: false, foreign_key: true                 |
| user_id              | integer | null: false, foreign_key: { to_table: :users } |
|                      |         |                                                |
| item_id              | integer | null: false, foreign_key: true                 |
| buyer_id             | integer | null: false, foreign_key: { to_table: :users } |

### Association
- has_many :users, dependent: :destroy
- belongs_to :item
- belongs_to :transaction_state
- belongs_to :buyer, class_name: "User"

## transactions_statesテーブル(マスターテーブル)

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| state  | string | null: false |

### Association
- has_many :transactions



## itemsテーブル

| Column             | Type       | Options                         |
| ------------------ | ---------- | ------------------------------- |
| name               | string     | null: false                     |
| description        | text       | null: false                     |
| condition_id       | integer    | null: false                     |
| user            | references | null: false, foreign_key: true  |
| postage_id         | integer    | null: false, foreign_key: true  |
| prefecture         | string     | null: false                     |
| delivery_day_id    | integer    | null: false                     |
| price              | integer    | null: false                     |
| brand_id           | integer    | null: false                     |
| likes_count        | integer    | null: false                     |
| category        | references | null: false , foreign_key: true |
| item_state     | references | null: false , foreign_key: true |

### Association
- has_many :likes, dependent: :destroy
- has_many :transactions, dependent: :destroy
- belongs_to :user
- belongs_to :condition
- has_many :categorys, through: :category
- belongs_to :delivery_day
- has_many :images, dependent: :destroy
- belongs_to :brand
- belongs_to :postage
- belongs_to :size
- has_many :item_comments
- belongs_to :item_state


## item_states(マスターテーブル)

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| state  | string | null: false |

## Association
- has_many :items


## conditionsテーブル(マスターテーブル)

| Column    | Type   | Options     |
| --------- | ------ | ----------- |
| condition | string | null: false |

### Association
- has_many :items


## categoriesテーブル(マスターテーブル)

| Column    | Type    | Options     |
| --------- | ------- | ----------- |
| name      | string  | null: false |
| ancestry | integer | null: false |

### Association
- has_many :items, through: :category_items, dependent: :destroy
- belongs_to :size
- belongs_to :parent, class_name: :Category
- has_many :children, class_name: :Category, foreign_key: :parent_id
- has_ancestry

## sizesテーブル(マスターテーブル)

| Column  | Type       | Options                        |
| ------- | ---------- | ------------------------------ |
| item | references | null: false, foreign_key: true |
| size    | string     | null: false                    |


### delivery_daysテーブル(マスターテーブル)

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| days   | string | null: false |

### Association
- has_many :items


## imagesテーブル

| Column  | Type       | Options                       |
| ------- | ---------- | ----------------------------- |
| item | references | null:false, foreign_key: true |
| image   | string     | null: false                   |

### Associations
- belongs_to :item


## brandsテーブル(マスターテーブル)

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |

### Association
- has_many :items
- has_many :categories


## postagesテーブル(マスターテーブル)

| Column          | Type   | Options     |
| --------------- | ------ | ----------- |
| delivery_charge | string | null: false |

### Association
- has_many :items