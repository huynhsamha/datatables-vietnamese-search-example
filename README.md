# datatables-vietnamese-search-example

🇻🇳 A small example for Vietnamese search in DataTables 🇻🇳

🇻🇳 Language: Vietnamese 🇻🇳

### Giới thiệu

Đây là một demo đơn giản cho vấn đề **tìm kiếm các dữ liệu Tiếng Việt** trong plugins [DataTables](https://datatables.net/).

Các bạn có thể xem demo [tại đây](https://huynhsamha.github.io/datatables-vietnamese-search-example/).

Trong demo này, mình sử dụng Webpack để build và dùng template [AdminLTE2](https://adminlte.io/themes/AdminLTE/index2.html) cho demo. Để hiểu rõ hơn về cách setup Webpack như demo này, các bạn có thể xem hướng dẫn về setup Webpack của mình tại [Repository https://github.com/huynhsamha/webpack-setup-multiple-pages](https://github.com/huynhsamha/webpack-setup-multiple-pages).

### Dữ liệu

Dữ liệu mình demo sử dụng là kinh độ và vĩ độ của các tỉnh thành Việt Nam. Các bạn có thể xem trực tiếp [raw data tại đây](https://github.com/huynhsamha/datatables-vietnamese-search-example/blob/master/public/data/data.json). Dữ liệu mình chỉ download từ nguồn khác và xử lý lại, chỉ mang tính chất tham khảo.

### Mục tiêu

Từ dữ liệu ta thực hiện hiển thị dữ liệu qua DataTables. Tại khung tìm kiếm của table, có có thể input vào các từ **Tiếng Việt không dấu** nhưng DataTables vẫn có thể filter được các dữ liệu từ các từ khoá này.

Ví dụ: Dữ liệu ta hiển thị là `Hồ Chí Minh`, và ta search từ khoá `ho chi`, khi đó các rows liên quan vẫn được filter như hình bên dưới.

<img src="https://github.com/huynhsamha/datatables-vietnamese-search-example/blob/master/screenshots/ho-chi.png">

Còn đây là ví dụ với tìm kiếm `ha noi`:

<img src="https://github.com/huynhsamha/datatables-vietnamese-search-example/blob/master/screenshots/ha-noi.png">

### Hiện thực

Việc tìm kiếm này cũng không quá khó. Mặc định DataTables sử dụng các dữ liệu của các cell/rows để lọc khi người dùng nhập input vào khung search. Tuy nhiên Tiếng Việt có dấu sẽ không thể lọc được. Ví dụ từ `Hồ` thì DataTables yêu cầu từ tìm kiếm phải có từ `ồ`, nếu ta nhập `o` thì sẽ không lọc được.

Vì thế mình sử dụng một *trick* nhỏ là tạo một cột dữ liệu `payload` cho từng row (cách này mình tự nghĩ ra thôi, có thể sẽ có những các **chính quy** khác hay hơn). Và đương nhiên cột này mình nên ẩn đi khỏi người dùng.

Trong cột `payload` này thì ta muốn thêm bất kì thông tin nào cho record của row đó cũng được, vì cơ bản nó đã được ẩn. Trong trường hợp này, ta có thể đặt payload là tên các tỉnh thành đã được xoá dấu (remove accents) của Tiếng Việt. Ví dụ row `Hồ Chí Minh` thì `payload` có thể là `ho-chi-minh`.

Việc xoá dấu cho các từ Tiếng Việt cũng không quá khó. Mình sử dụng thư viện [jsrmvi](https://www.npmjs.com/package/jsrmvi) để thực hiện xoá dấu các từ Tiếng Việt.

#### Chi tiết mã nguồn

**HTML cho bảng dữ liệu**

*Trong file [layouts/content.html](https://github.com/huynhsamha/datatables-vietnamese-search-example/blob/master/layouts/content.html)*

```html
<table id="tbData" class="table table-bordered table-condensed" width="100%">
	<thead>
	<tr>
		<th>Thành phố</th>
		<th>Admin</th>
		<th>Vĩ độ</th>
		<th>Kinh độ</th>
		<th style="display: none;">[Hidden] Payload</th>
	</tr>
	</thead>
	<tbody>
	</tbody>
</table>
```

**Khởi tạo DataTables cho bảng `tbData`**

*Trong file [src/index.js](https://github.com/huynhsamha/datatables-vietnamese-search-example/blob/master/src/index.js)*

```js
// Khởi tạo datatable
function initDataTables() {
    Tables.tbData = $Elements.tbData.DataTable({
      data: [], pagingType: 'numbers',
      deferRender: true,
      columns: [
        { }, // city
        { }, // admin
        { }, // lat
        { }, // lng
        { visible: false } // payload
      ],
      createdRow: (row, data, index) => {
      }
    });
}

// Chuyển dữ liệu JSON load được sang các rows của bảng
// Cột payload sử dụng `city` và `admin` đã được remove accents
function parseDataToTable(data = []) {
    return data.map((r) => {
      const { city, admin, lat, lng } = r;
      const payload = `${jsrmvi.removeVI(city)}|${jsrmvi.removeVI(admin)}`;
      return [city, admin, parseInt(lat, 10), parseInt(lng, 10), payload];
    });
}

// Đẩy dữ liệu vào bảng và render lại
Tables.tbData.rows.add(rows).draw();
```

#### Cấu trúc mã nguồn

```bash
./
├── README.md
├── dist              # Source cho Github Page, được build bằng wepack
│   ├── adminlte2     #
│   ├── css           #
│   ├── data          #
│   ├── img           #
│   ├── index.html    #
│   ├── js            #
│   └── plugins       #
├── layouts           # 
│   ├── content.html  # chứa table được render
│   ├── footer.html   #
│   ├── header.html   #
│   ├── include       #
│   └── sidebar.html  #
├── package.json      # có thể xem các script trong này
├── postcss.config.js #
├── public            #
│   ├── adminlte2     #
│   ├── css           #
│   ├── data          # file `data.json` là file được load
│   ├── img           #
│   └── plugins       #
├── scss              #
├── src               #
│   └── index.js      # entry file của webpack, được bundle và thêm vào index.html trong dist
├── views             #
│   └── index.html    # HTML
├── webpack.common.js #
├── webpack.config.js #
├── webpack.dev.js    #
├── webpack.prod.js   #
└── yarn.lock         #
```

### Development

+ Clone source
+ Install dependencies: `yarn`
+ Start localhost: `yarn start`, port `4200` (defined in `package.json`)
+ Build and deploy github page: `yarn deploy` (defined in `package.json`)
