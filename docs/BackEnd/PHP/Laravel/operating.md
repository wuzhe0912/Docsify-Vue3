# Laravel 操作陣列

> 除了 PHP 原生的陣列操作方法，Laravel 也有提供其對應的操作方法
> [官方文件](https://laravel.tw/docs/5.2/collections)

## Collection
先改寫前文的假資料：
```
// Mock Data
public function getMockData()
{
    return collect([
        collect([
            'title' => '健身環大冒險',
            'content' => '一邊冒險一邊健身',
            'price' => 9999
        ]),
        collect([
            'title' => '拳擊有氧',
            'content' => '減重拳擊、健身拳擊',
            'price' => 7777
        ]),
    ]);
}
```
雖然回傳到前端的格式沒有差別，但在後端這邊，則會被調整包在`collection`內。因此在`push`時的寫法也要進行調整：
```
public function store(Request $request)
{
    $data = $this->getMockData();
    $postData = $request->all();
    $data->push(collect($postData));
    return response($data);
}
```
## update
當我們需要更新資料時，必然要有一個依據，通常是根據每一筆資料中的唯一值(常見於`id`)。透過`where()`方法查找資料中符合`id`的第一筆資料，將更新的資料和查找到資料進行`merge()`後，新資料覆蓋舊資料，達到更新的目的。
```
public function update(Request $request, $id)
{
    $newData = $request->all();
    $data = $this->getMockData();
    $updateData = $data->where('id', $id)->first();
    $updateData = $updateData->merge(collect($newData));
    return response($updateData);
}
```
從中也可以看到`$id`其實就是網址中帶的`id`參數。
## delete
```
public function destroy($id)
{
    $data = $this->getMockData();
    // 這邊帶有 closure 的特性，外層的 $id 參數，在內層 function 抓不到，所以要用 use()
    $data = $data->filter(function($product) use ($id) {
        return $product['id'] != $id;
    });
    return response($data->values());
}
```