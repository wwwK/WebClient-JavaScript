## 绘制带洞区

### 示例功能

本示例实现在三维场景中绘制带洞区。

### 示例实现

本示例需要使用【include-cesium-local.js】开发库实现，关键接口为`CesiumZondy.Manager.EntityController`类提供的`appendHolePolygon()`方法，实现带洞区的添加绘制。

> 开发库使用请参见*首页-概述-原生JS调用*内容。

### 实现步骤

1. 引用开发库：本示例引用local本地【include-cesium-local.js】开发库，完成此步骤后才可调用三维WebGL的功能；

2. 创建三维视图Div容器，构造三维场景控件WebSceneControl，构造并设置鼠标位置信息显示控件，加载Google地图作为底图显示；

3. 绘制带洞区：首先构造`CesiumZondy.Manager.EntityController`几何绘制控制对象，构造外圈、内圈坐标点数组，然后调用`appendHolePolygon()`方法，设置信息：区名称、内圈与外圈坐标点数组、区填充色，即可实现带洞区的添加绘制。每一圈坐标点序列，都必须首尾点一致形成闭合区，并且可以添加多圈内圈坐标。

    ``` javascript
    //构造几何绘制控制对象
    var entityController = new CesiumZondy.Manager.EntityController({
        viewer: webGlobe.viewer
    });

    //外圈坐标点
    var point_out = [
        114.40328987990017, 30.479789358042233,
        114.40255973680176, 30.473707285934392,
        114.40905754990294, 30.473938016458956,
        114.40971219770601, 30.479196348500707,
        114.40328987990017, 30.479789358042233
    ];
    //内圈坐标点（可添加多圈内圈坐标点）
    var point_in = [
        [
            114.40788399535329, 30.47712432587247,
            114.4077781482791, 30.47586494219165,
            114.40919532034856, 30.47700722872353,
            114.40788399535329, 30.47712432587247
        ],
        [
            114.40582893901652, 30.478599513299535,
            114.40570115301699, 30.47795978731544,
            114.40655655628692, 30.478318639933967,
            114.40582893901652, 30.478599513299535
        ]
    ];

    //添加带洞多边形
    var holePolygon = entityController.appendHolePolygon(
        //名称
        "带洞区",
        //外圈坐标
        point_out,
        //内圈坐标
        point_in,
        {
            //颜色
            material: new Cesium.Color(0 / 255, 0 / 255, 255 / 255, 0.5),
            //多边形相对于地球表面的高度
            extrudedHeight: 100
        }
    );
    ```

### 关键接口

#### 1.【三维场景控件】WebSceneControl

#### 2.【几何绘制控制类】CesiumZondy.Manager.EntityController

##### （1）`appendHolePolygon(name, latLonsOut, latLonsIn, options) → {Entity}`：添加带洞区（二维）

> `appendHolePolygon`方法主要参数

|参数名|类 型|说 明|
|-|-|-|
|name|String|名称|
|latLonsOut|Array|外圈坐标：[x1,y1,x2,y2,x3,y3]|
|latLonsIn|Array|内圈坐标：Array<[x1,y1,x2,y2,x3,y3]>|
|options|Object|附加属性|

> `options`属性主要参数

| 参数名      | 类 型    | 说 明                 |
| ----------- | -------| --------------------- |
|material	|Color	|（可选）填充颜色  new Cesium.Color(0, 0, 1, 1)|