
<template>
  <div class="q-pa-md">


    <q-table
      title="扫码状态"
      separator="cell"
      header: false
      hide-header
      hide-bottom
      :data="scan_data"
      :columns="columns"
      row-key="op10"
    >
      <template v-slot:body="props">
        <q-tr >

          <q-td key="op05" >
           <status :status="props.row.op05" />
          </q-td>
          
          <q-td key="op10" >
           <status :status="props.row.op10" />
          </q-td>

          <q-td key="op20" >
           <status :status="props.row.op20" />
          </q-td>
               
          <q-td key="op30" >
           <status :status="props.row.op30" />
          </q-td>

          <q-td key="op40" >
           <status :status="props.row.op40" />
          </q-td>

          <q-td key="op50" >
           <status :status="props.row.op50" />
          </q-td>

          <q-td key="op60" >
           <status :status="props.row.op60" />
          </q-td>

          <q-td key="op70" >
           <status :status="props.row.op70" />
          </q-td>
                                                                                          
          <q-td key="op80" >
           <status :status="props.row.op80" />
          </q-td>

          <q-td key="op90" >
           <status :status="props.row.op90" />
          </q-td>
               
          <q-td key="op100" >
           <status :status="props.row.op100" />
          </q-td>
                                          
        </q-tr>
      </template>
    </q-table>

    <canvas ref="can" width="1200" height="400"></canvas>
    
    <q-table
      title="测试状态"
      separator="cell"
      header: false
      hide-header
      hide-bottom
      :data="test_data"
      :columns="columns"
      row-key="op10"
    >
      <template v-slot:body="props">
        <q-tr >

          <q-td key="op05" >
           <status :status="props.row.op05" />
          </q-td>
          
          <q-td key="op10" >
           <status :status="props.row.op10" />
          </q-td>

          <q-td key="op20" >
           <status :status="props.row.op20" />
          </q-td>
               
          <q-td key="op30" >
           <status :status="props.row.op30" />
          </q-td>

          <q-td key="op40" >
           <status :status="props.row.op40" />
          </q-td>

          <q-td key="op50" >
           <status :status="props.row.op50" />
          </q-td>

          <q-td key="op60" >
           <status :status="props.row.op60" />
          </q-td>

          <q-td key="op70" >
           <status :status="props.row.op70" />
          </q-td>
                                                                                          
          <q-td key="op80" >
           <status :status="props.row.op80" />
          </q-td>

          <q-td key="op90" >
           <status :status="props.row.op90" />
          </q-td>
               
          <q-td key="op100" >
           <status :status="props.row.op100" />
          </q-td>
               
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>

export default {
  
  name: 'ProductionStatus',
  components: {
      Status: () =>  import('components/lights/Status')
  },
  data () {
    return {
      // path:"ws://192.168.92.200:8888/ws/device",
      // socket:"",

      columns: [
        { name: 'op05', label: 'OP05', field: 'op05', align: 'center'},
        { name: 'op10', label: 'OP10', field: 'op10', align: 'center'},
        { name: 'op20', label: 'OP20', field: 'op20', align: 'center'},
        { name: 'op30', label: 'OP30', field: 'op30',align: 'center' },
        { name: 'op40', label: 'OP40', field: 'op40',align: 'center' },
        { name: 'op50', label: 'OP50', field: 'op50',align: 'center' },
        { name: 'op60', label: 'OP60', field: 'op60',align: 'center' },
        { name: 'op70', label: 'OP70', field: 'op70',align: 'center' },
        { name: 'op80', label: 'OP80', field: 'op80',align: 'center' },
        { name: 'op90', label: 'OP90', field: 'op90',align: 'center' },
        { name: 'op100', label: 'OP100', field: 'op100',align: 'center' },
      ],

    }
  },


  mounted () {
    // 初始化
    // this.init()
    const payload = {
        // 生产中订单
        status: 2,
    }
    if (this.timer){
      clearInterval(this.timer)
    }else{
      this.timer = setInterval(() => {this.$store.dispatch('get_produce_production_order', payload)}, 1000)
    } 
    
    const ref = this.$refs.can
    const canvas = new fabric.Canvas(ref)

    // // 使用本地图片
    // let imgUrl = require('@/statics/images/axle.jpg')
    // // 使用网络图片
    // // let imgUrl = '链接地址'
    // fabric.Image.fromURL(imgUrl, (img, err) => {
    //   if(err) {
    //     canvas.setBackgroundColor('rgba(85, 107, 198, 0.6)', 
    //     canvas.renderAll.bind(canvas))
    //   }else {
    //     canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {

    //     scaleX: canvas.width / img.width,
    //     scaleY: canvas.height / img.height,
    //     crossOrigin: 'anonymous' // 使用的图片跨域时，配置此参数
    //     });
    //   }
    // })

    // //也可以通过标签绘制
    // let img = document.getElementById("img");
    // let image = new fabric.Image(img, {
    //     left: 100,
    //     top: 100,
    //     opacity: 0.8,
    // });
    // canvas.add(image);

    canvas.setBackgroundColor('rgba(85, 107, 198, 0.6)', 
    canvas.renderAll.bind(canvas))

    let imgUrl = require('@/statics/images/axle.jpg')
    //通过url绘制图片
    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 20, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );

    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 120, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );

    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 220, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );

    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 320, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );
    
    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 420, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );
    
    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 520, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );
    
    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 620, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );
    
    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 720, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );
    
    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 820, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );
    
    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 920, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );
    
    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 1020, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );    

    
    fabric.Image.fromURL(
        //本地图片需要通过require来引入,require("./xxx.jpeg")
        imgUrl,
        (img) => {
            img.set({ left: 1120, top: 250, angle: 270 }).scale(0.4)
            // img.rotate(270);
            canvas.add(img);
        }
    );    



    let scannerUrl = require('@/statics/images/scanner.png')
    //通过url绘制图片
    fabric.Image.fromURL(
        scannerUrl,
        (img) => {
            img.set({ left: 30, top: 30, angle: 0 }).scale(0.1)
            canvas.add(img);
        }
    );


    let ningjinUrl = require('@/statics/images/ningjin.png')
    //通过url绘制图片
    fabric.Image.fromURL(
        ningjinUrl,
        (img) => {
            img.set({ left: 210, top: 310, angle: 0 }).scale(0.5)
            canvas.add(img);
        }
    );

    fabric.Image.fromURL(
        ningjinUrl,
        (img) => {
            img.set({ left: 410, top: 310, angle: 0 }).scale(0.5)
            canvas.add(img);
        }
    );

    let cameraUrl = require('@/statics/images/camera.png')
    //通过url绘制图片
    fabric.Image.fromURL(
        cameraUrl,
        (img) => {
            img.set({ left: 610, top: 30, angle: 0 }).scale(0.3)
            canvas.add(img);
        }
    );

    let qimiUrl = require('@/statics/images/qimi.png')
    //通过url绘制图片
    fabric.Image.fromURL(
        qimiUrl,
        (img) => {
            img.set({ left: 810, top: 310, angle: 0 }).scale(0.4)
            canvas.add(img);
        }
    );

    // 创建一个矩形对象
    let rect = new fabric.Rect({
        left: 0, //距离左边的距离
        top: 100, //距离上边的距离
        fill: "grey", //填充的颜色
        width: 1200, //矩形宽度
        height: 200, //矩形高度
    });

    // let text = new fabric.Text(
    //     "OP05",
    //     {
    //         left: 0,
    //         top: 100,
    //         fontFamily: "Comic Sans", //字体
    //         fontSize: 10, //字号
    //         fontWeight: 800, //字体粗细,可以使用关键字（“normal”，“bold”）或数字（100,200,400,600,800）
    //         shadow: "green 3px 3px 2px", //文字阴影,颜色，水平偏移，垂直偏移和模糊大小。
    //         underline: true, //下划线
    //         linethrough: true, //删除线
    //         overline: true, //上划线
    //         fontStyle: "italic", //字体风格,normal（正常）或italic（斜体）
    //         stroke: "#c3bfbf", //描边的颜色
    //         strokeWidth: 1, //描边的宽度
    //         textAlign: "center", //文本对齐方式
    //         lineHeight: 1.5, //行高
    //         textBackgroundColor: "#91A8D0", //文本背景颜色
    //     }
    // );
    // canvas.add(text);

    // // 创建一个圆形对象
    // let circle = new fabric.Circle({
    //     left: 0, //距离左边的距离
    //     top: 0, //距离上边的距离
    //     fill: this.scan_data[0].op05.left, //填充的颜色
    //     radius: 50, //圆的半径
    // });

    // 创建一个三角形对象
    let triangle = new fabric.Triangle({
        left: 1150, //距离左边的距离
        top: 80, //距离上边的距离
        fill: "blue", //填充的颜色
        width: 20, //宽度
        height: 20, //高度
    });
    triangle.set('angle', 90);
    // triangle.animate("left", "+=100", {
    //     onChange: canvas.renderAll.bind(canvas),
    //     duration: 5000,
    // });

    canvas.add(rect)
    // canvas.add(circle, triangle);
    canvas.add(triangle);
      
  
    // 自定义类型，蓝色分割线
    var BlueLine = fabric.util.createClass(fabric.Line, {
        type: 'BlueLine',
        initialize: function(options) {
            this.callSuper('initialize', options)
            this.stroke= 'blue' // 直线颜色
            this.strokeWidth= 4 // 直线宽度
            this.strokeDashArray= [3, 1] // 这是画虚线时要加的，每隔a个像素空b个像素
            this.evented= false // 设置为false时，对象不能成为事件的目标
            this.hasControls= false // 设置为false时，选中的时候不出现旋转缩放标识
            this.hasBorders= false // 设置为false时，选中的时候不出现边框
        },

        _render: function(ctx) {
            this.callSuper('_render', ctx);
        }
    });

  
    // // 自定义类型，文本框
    // var TitleText = fabric.util.createClass(fabric.Text, {
    //     type: 'TitleText',
    //     initialize: function(options) {
    //         this.callSuper('initialize', options)
    //         this.fontFamily= "Comic Sans" //字体
    //         this.fontSize= 14 //字号
    //         this.fontWeight= 'bold' //字体粗细,可以使用关键字（“normal”，“bold”）或数字（100,200,400,600,800）
    //         // this.shadow= "green 3px 3px 2px" //文字阴影,颜色，水平偏移，垂直偏移和模糊大小。
    //         this.underline= false //下划线
    //         this.linethrough= false //删除线
    //         this.overline= false //上划线
    //         // this.fontStyle= "italic" //字体风格,normal（正常）或italic（斜体）
    //         // this.stroke= "#c3bfbf" //描边的颜色
    //         // this.strokeWidth= 1 //描边的宽度
    //         this.textAlign= "center" //文本对齐方式
    //         this.lineHeight= 1.5 //行高
    //         this.textBackgroundColor= "#91A8D0" //文本背景颜色
    //     },

    //     _render: function(ctx) {
    //         this.callSuper('_render', ctx);
    //     }
    // });

    canvas.add(
      new BlueLine([100, 100, 100, 300]),
      new BlueLine([200, 100, 200, 300]),
      new BlueLine([300, 100, 300, 300]),
      new BlueLine([400, 100, 400, 300]),
      new BlueLine([500, 100, 500, 300]),
      new BlueLine([600, 100, 600, 300]),
      new BlueLine([700, 100, 700, 300]),
      new BlueLine([800, 100, 800, 300]),
      new BlueLine([900, 100, 900, 300]),
      new BlueLine([1000, 100, 1000, 300]),
      new BlueLine([1100, 100, 1100, 300]),
    );

    canvas.add(
      new fabric.Text('OP05', { left: 20, top: 100, fontSize: 20 }),
      new fabric.Text('OP10', { left: 120, top: 100, fontSize: 20 }),
      new fabric.Text('OP20', { left: 220, top: 100, fontSize: 20 }),
      new fabric.Text('OP30', { left: 320, top: 100, fontSize: 20 }),
      new fabric.Text('OP40', { left: 420, top: 100, fontSize: 20 }),
      new fabric.Text('OP50', { left: 520, top: 100, fontSize: 20 }),
      new fabric.Text('OP60', { left: 620, top: 100, fontSize: 20 }),
      new fabric.Text('OP70', { left: 720, top: 100, fontSize: 20 }),
      new fabric.Text('OP80', { left: 820, top: 100, fontSize: 20 }),
      new fabric.Text('OP90', { left: 920, top: 100, fontSize: 20 }),
      new fabric.Text('OP100', { left: 1020, top: 100, fontSize: 20 }),
      new fabric.Text('OP110', { left: 1120, top: 100, fontSize: 20 }),

    );

    canvas.on('object:selected', function(e) { console.log(e.target); });

  },

  computed: {
    // 计算属性的 getter

    scan_data: {
      get: function () {
        const produce_production_orders = this.$store.state.production_order.produce_production_orders

        console.log('---produce_production_orders in vue----')
        console.log(produce_production_orders)

        function getColor(value){
          if (value){
            return 'green'
          }
          else{
            return 'red'
          }
        }

        let scan_data_list = []
        let current_status_dict = {}

        if (produce_production_orders.length > 0){

          const op05 = getColor(produce_production_orders[0].scan_result) ? getColor(produce_production_orders[0].scan_result): ''
          const op10_L = getColor(produce_production_orders[1].scan_result) ? getColor(produce_production_orders[1].scan_result): ''
          const op10_R = getColor(produce_production_orders[2].scan_result) ? getColor(produce_production_orders[2].scan_result): ''
          const op20_L = getColor(produce_production_orders[3].scan_result) ? getColor(produce_production_orders[3].scan_result): ''
          const op20_R = getColor(produce_production_orders[4].scan_result) ? getColor(produce_production_orders[4].scan_result): ''
          const op30_L = getColor(produce_production_orders[5].scan_result) ? getColor(produce_production_orders[5].scan_result): ''
          const op30_R = getColor(produce_production_orders[6].scan_result) ? getColor(produce_production_orders[6].scan_result): ''
          const op40_L = getColor(produce_production_orders[7].scan_result) ? getColor(produce_production_orders[7].scan_result): ''
          const op40_R = getColor(produce_production_orders[8].scan_result) ? getColor(produce_production_orders[8].scan_result): ''
          const op50_L = getColor(produce_production_orders[9].scan_result) ? getColor(produce_production_orders[9].scan_result): ''
          const op50_R = getColor(produce_production_orders[10].scan_result) ? getColor(produce_production_orders[10].scan_result): ''
          const op60_L = getColor(produce_production_orders[11].scan_result) ? getColor(produce_production_orders[11].scan_result): ''
          const op60_R = getColor(produce_production_orders[12].scan_result) ? getColor(produce_production_orders[12].scan_result): ''
          const op70_L = getColor(produce_production_orders[13].scan_result) ? getColor(produce_production_orders[13].scan_result): ''
          const op70_R = getColor(produce_production_orders[14].scan_result) ? getColor(produce_production_orders[14].scan_result): ''
          const op80_L = getColor(produce_production_orders[15].scan_result) ? getColor(produce_production_orders[15].scan_result): ''
          const op80_R = getColor(produce_production_orders[16].scan_result) ? getColor(produce_production_orders[16].scan_result): ''
          const op90_L = getColor(produce_production_orders[17].scan_result) ? getColor(produce_production_orders[17].scan_result): ''
          const op90_R = getColor(produce_production_orders[18].scan_result) ? getColor(produce_production_orders[18].scan_result): ''
          const op100_L = getColor(produce_production_orders[19].scan_result) ? getColor(produce_production_orders[19].scan_result): ''
          const op100_R = getColor(produce_production_orders[20].scan_result) ? getColor(produce_production_orders[20].scan_result): ''

          
          current_status_dict ={
            op05: {operation: 'OP05',left: op05, right: ''},
            op10: {operation: 'OP10',left: op10_L, right: op10_R},
            op20: {operation: 'OP20',left: op20_L, right: op20_R},
            op30: {operation: 'OP30',left: op30_L, right: op30_R},
            op40: {operation: 'OP40',left: op40_L, right: op40_R},
            op50: {operation: 'OP50',left: op50_L, right: op50_R},
            op60: {operation: 'OP60',left: op60_L, right: op60_R},
            op70: {operation: 'OP70',left: op70_L, right: op70_R},
            op80: {operation: 'OP80',left: op80_L, right: op80_R},
            op90: {operation: 'OP90',left: op90_L, right: op90_R},
            op100: {operation: 'OP100',left: '', right: ''},
          }

        }
        else{
          console.log('===============current_status_dict==============')
          current_status_dict = {
            op05: {operation: 'OP05',left: 'green', right: 'green'},
            op10: {operation: 'OP10',left: 'green', right: 'green'},
            op20: {operation: 'OP20',left: 'green', right: 'green'},
            op30: {operation: 'OP30',left: 'green', right: 'green'},
            op40: {operation: 'OP40',left: 'green', right: 'green'},
            op50: {operation: 'OP50',left: 'green', right: 'green'},
            op60: {operation: 'OP60',left: 'green', right: 'green'},
            op70: {operation: 'OP70',left: 'green', right: 'green'},
            op80: {operation: 'OP80',left: 'green', right: 'green'},
            op90: {operation: 'OP90',left: 'green', right: 'green'},
            op100: {operation: 'OP100',left: 'green', right: 'green'},            
          }
        }
        
        scan_data_list.push(current_status_dict)

        return scan_data_list
      }
    },

    test_data: {
      get: function () {
        const produce_production_orders = this.$store.state.production_order.produce_production_orders
        let test_data_list = []
        let current_status_dict = {}

        function getColor(value){
          if (value){
            return 'green'
          }
          else{
            return 'red'
          }
        }
        if (produce_production_orders.length > 0){        
          const op05 = getColor(produce_production_orders[0].test_result) ? getColor(produce_production_orders[0].test_result): ''
          const op10_L = getColor(produce_production_orders[1].test_result) ? getColor(produce_production_orders[1].test_result): ''
          const op10_R = getColor(produce_production_orders[2].test_result) ? getColor(produce_production_orders[2].test_result): ''
          const op20_L = getColor(produce_production_orders[3].test_result) ? getColor(produce_production_orders[3].test_result): ''
          const op20_R = getColor(produce_production_orders[4].test_result) ? getColor(produce_production_orders[4].test_result): ''
          const op30_L = getColor(produce_production_orders[5].test_result) ? getColor(produce_production_orders[5].test_result): ''
          const op30_R = getColor(produce_production_orders[6].test_result) ? getColor(produce_production_orders[6].test_result): ''
          const op40_L = getColor(produce_production_orders[7].test_result) ? getColor(produce_production_orders[7].test_result): ''
          const op40_R = getColor(produce_production_orders[8].test_result) ? getColor(produce_production_orders[8].test_result): ''
          const op50_L = getColor(produce_production_orders[9].test_result) ? getColor(produce_production_orders[9].test_result): ''
          const op50_R = getColor(produce_production_orders[10].test_result) ? getColor(produce_production_orders[10].test_result): ''
          const op60_L = getColor(produce_production_orders[11].test_result) ? getColor(produce_production_orders[11].test_result): ''
          const op60_R = getColor(produce_production_orders[12].test_result) ? getColor(produce_production_orders[12].test_result): ''
          const op70_L = getColor(produce_production_orders[13].test_result) ? getColor(produce_production_orders[13].test_result): ''
          const op70_R = getColor(produce_production_orders[14].test_result) ? getColor(produce_production_orders[14].test_result): ''
          const op80_L = getColor(produce_production_orders[15].test_result) ? getColor(produce_production_orders[15].test_result): ''
          const op80_R = getColor(produce_production_orders[16].test_result) ? getColor(produce_production_orders[16].test_result): ''
          const op90_L = getColor(produce_production_orders[17].test_result) ? getColor(produce_production_orders[17].test_result): ''
          const op90_R = getColor(produce_production_orders[18].test_result) ? getColor(produce_production_orders[18].test_result): ''
          const op100_L = getColor(produce_production_orders[19].test_result) ? getColor(produce_production_orders[19].test_result): ''
          const op100_R = getColor(produce_production_orders[20].test_result) ? getColor(produce_production_orders[20].test_result): ''

          current_status_dict ={
            op05: {operation: 'OP05',left: '', right: ''},
            op10: {operation: 'OP10',left: op10_L, right: op10_R},
            op20: {operation: 'OP20',left: op20_L, right: op20_R},
            op30: {operation: 'OP30',left: op30_L, right: op30_R},
            op40: {operation: 'OP40',left: op40_L, right: op40_R},
            op50: {operation: 'OP50',left: op50_L, right: op50_R},
            op60: {operation: 'OP60',left: op60_L, right: op60_R},
            op70: {operation: 'OP70',left: op70_L, right: op70_R},
            op80: {operation: 'OP80',left: op80_L, right: op80_R},
            op90: {operation: 'OP90',left: op90_L, right: op90_R},
            op100: {operation: 'OP100',left: op100_L, right: op100_R},
          }
        }
        else{
          current_status_dict = {
            op05: {operation: 'OP05',left: 'green', right: 'green'},
            op10: {operation: 'OP10',left: 'green', right: 'green'},
            op20: {operation: 'OP20',left: 'green', right: 'green'},
            op30: {operation: 'OP30',left: 'green', right: 'green'},
            op40: {operation: 'OP40',left: 'green', right: 'green'},
            op50: {operation: 'OP50',left: 'green', right: 'green'},
            op60: {operation: 'OP60',left: 'green', right: 'green'},
            op70: {operation: 'OP70',left: 'green', right: 'green'},
            op80: {operation: 'OP80',left: 'green', right: 'green'},
            op90: {operation: 'OP90',left: 'green', right: 'green'},
            op100: {operation: 'OP100',left: 'green', right: 'green'},            
          }          
        }

        test_data_list.push(current_status_dict)

        return test_data_list
      }
    },

  },
  methods: {
      init: function () {
          if(typeof(WebSocket) === "undefined"){
              alert("您的浏览器不支持socket")
          }else{
              // 实例化socket
              this.socket = new WebSocket(this.path)
              // 监听socket连接
              this.socket.onopen = this.open
              // 监听socket错误信息
              this.socket.onerror = this.error
              // 监听socket消息
              this.socket.onmessage = this.getMessage
          }
      },
      open: function () {
          console.log("socket连接成功")
      },
      error: function () {
          console.log("连接错误")
      },
      getMessage: function (msg) {
          console.log(msg.data)
      },
      send: function () {
          this.socket.send(params)
      },
      close: function () {
          console.log("socket已经关闭")
      },

      getColor(value){
        if (value){
          return 'green'
        }
        else{
          return 'grey'
        }
      },      
  },
  destroyed () {
      // 销毁监听
      // this.socket.onclose = this.close
    clearInterval(this.timer)

  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 50px
</style>