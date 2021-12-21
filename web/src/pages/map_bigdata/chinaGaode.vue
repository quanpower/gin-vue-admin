<template>
    <div id="china_map_box">
        <el-button type="primary" size="mini" class="back" @click="back">返回</el-button>
        <div class="map" >
            <map-range @change="search"></map-range>
        </div>
        <div class="echarts">
            <div id="map"></div>
        </div>
    </div>
</template>

<script>
    import mapRange from "./mapRange";

    export default {
        name: "chinaGaode",
        components: {
            mapRange
        },
        data() {
            return {
                provinceSelect: null,
                citySelect: null,
                districtSelect: null,
                areaName: '中国',
                geoJsonData: '',
                echartsMap: null,
                map: null,
                district: null,
                polygons: [],
                areaCode: 100000,
                opts: {},
                areaData: {},
                mapData: [],
                deepTree:[],
            }
        },
        mounted() {
            this.provinceSelect = document.getElementById('province');
            this.citySelect = document.getElementById('city');
            this.districtSelect = document.getElementById('district');
            this.deepTree = [{mapData: this.mapData,code: 100000}];
            this.echartsMap = this.$echarts.init(document.getElementById('map'));
            this.echartsMap.on('click', this.echartsMapClick);
            this.map = new AMap.Map('container', {
                resizeEnable: true,
                center: [116.30946, 39.937629],
                zoom: 3
            });
            this.opts = {
                subdistrict: 1,   //返回下一级行政区
                showbiz: false  //最后一级返回街道信息
            };
            this.district = new AMap.DistrictSearch(this.opts);//注意：需要使用插件同步下发功能才能这样直接使用
            this.district.search('中国', (status, result) => {
                if (status == 'complete') {
                    this.getData(result.districtList[0], '', 100000);
                }
            });
        },
        methods: {
            //地图点击事件
            echartsMapClick(params) {
                if (params.data.level == 'street') return;
                //清除地图上所有覆盖物
                for (var i = 0, l = this.polygons.length; i < l; i++) {
                    this.polygons[i].setMap(null);
                }
                this.areaName = params.data.name;
                this.areaCode = params.data.areaCode;
                this.district.setLevel(params.data.level); //行政区级别
                this.district.setExtensions('all');
                //行政区查询
                //按照adcode进行查询可以保证数据返回的唯一性
                this.district.search(this.areaCode, (status, result) => {
                    if (status === 'complete') {
                        this.deepTree.push({mapData: this.mapData,code: params.data.areaCode});
                        this.getData(result.districtList[0], params.data.level, this.areaCode);
                    }
                });
                this.$emit('map-change', params.data);
            },
            loadMapData(areaCode) {
                AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
                    //创建一个实例
                    var districtExplorer = window.districtExplorer = new DistrictExplorer({
                        eventSupport: true, //打开事件支持
                        map: this.map
                    });
                    districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        let mapJson = {};
                        mapJson.type = "FeatureCollection";
                        mapJson.features = areaNode.getSubFeatures();
                        this.loadMap(this.areaName, mapJson);
                        this.geoJsonData = mapJson;
                    });
                });
            },
            loadMap(mapName, data) {
                if (data) {
                    this.$echarts.registerMap(mapName, data);
                    var option = {

                        visualMap: {
                            type: 'piecewise',
                            pieces: [
                                {max: 1, label: '审核完成', color: '#2c9a42'},
                                {min: -1, max: 1, label: '未完成', color: '#d08a00'},
                                // {min: 60, label: '危险', color: '#c23c33'},
                            ],
                            color: '#fff',
                            textStyle: {
                                color: '#fff',
                            },
                            visibility: 'off',
                            top:50,
                            left:30,
                        },
                        series: [{
                            name: '数据名称',
                            type: 'map',
                            roam: false,
                            mapType: mapName,
                            selectedMode: 'single',
                            showLegendSymbol: false,
                            visibility: 'off',
                            itemStyle: {
                                normal: {
                                    color: '#ccc',
                                    areaColor: '#fff',
                                    borderColor: '#fff',
                                    borderWidth: 0.5,
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(249, 249, 249)",
                                            fontSize: '1rem'
                                        }
                                    }
                                },
                                emphasis: {
                                    areaColor: false,
                                    borderColor: '#fff',
                                    areaStyle: {
                                        color: '#fff'
                                    },
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "rgb(249, 249, 249)"
                                        }
                                    }
                                }
                            },
                            data: this.mapData,
                        }]
                    };
                    this.echartsMap.setOption(option);
                }
            },
            getData(data, level, adcode) {
                var bounds = data.boundaries;
                if (bounds) {
                    for (var i = 0, l = bounds.length; i < l; i++) {
                        var polygon = new AMap.Polygon({
                            map: this.map,
                            strokeWeight: 1,
                            strokeColor: '#0091ea',
                            fillColor: '#80d8ff',
                            fillOpacity: 0.2,
                            path: bounds[i]
                        });
                        this.polygons.push(polygon);
                    }
                    this.map.setFitView();//地图自适应
                }

                //清空下一级别的下拉列表
                if (level === 'province') {
                    this.citySelect.innerHTML = '';
                    this.districtSelect.innerHTML = '';
                } else if (level === 'city') {
                    this.districtSelect.innerHTML = '';
                }
                var subList = data.districtList;
                if (subList) {
                    let optionName = '--请选择--';
                    var contentSub = new Option(optionName);
                    var curlevel = subList[0].level;
                    if (curlevel === 'street') {
                        let mapJsonList = this.geoJsonData.features;
                        let mapJson = {};
                        for (let i in mapJsonList) {
                            if (mapJsonList[i].properties.name == this.areaName) {
                                mapJson.type = "FeatureCollection";
                                mapJson.features = [].concat(mapJsonList[i]);
                            }
                        }
                        this.mapData = [];
                        this.mapData.push({name: this.areaName, value: 0, level: curlevel});
                        this.loadMap(this.areaName, mapJson);
                        return;
                    }

                    var curList = document.querySelector('#' + curlevel);
                    curList.add(contentSub);
                    this.mapData = [];
                    for (var i = 0, l = subList.length; i < l; i++) {
                        var name = subList[i].name;
                        var areaCode = subList[i].adcode;
                        this.mapData.push({
                            name: name,
                            value: Math.round(Math.random()),
                            areaCode: areaCode,
                            level: curlevel
                        });
                        var levelSub = subList[i].level;
                        contentSub = new Option(name);
                        contentSub.setAttribute("value", levelSub);
                        contentSub.center = subList[i].center;
                        contentSub.adcode = subList[i].adcode;
                        curList.add(contentSub);
                    }
                    this.loadMapData(adcode);
                    this.areaData[curlevel] = curList;
                }

            },
            search(area) {
                let obj = this.areaData[area];
                //清除地图上所有覆盖物
                for (var i = 0, l = this.polygons.length; i < l; i++) {
                    this.polygons[i].setMap(null);
                }
                var option = obj[obj.options.selectedIndex];

                var keyword = option.text; //关键字
                var adcode = option.adcode;
                this.areaName = keyword;
                this.areaCode = adcode;
                this.district.setLevel(option.value); //行政区级别
                this.district.setExtensions('all');
                //行政区查询
                //按照adcode进行查询可以保证数据返回的唯一性
                this.district.search(adcode, (status, result) => {
                    if (status === 'complete') {
                        this.deepTree.push({mapData: this.mapData,code:adcode});
                        this.getData(result.districtList[0], obj.id, adcode);
                    }
                });
                var params = {
                    areaCode: adcode,
                    level: area,
                    name: keyword,
                    value: '',
                };
                this.$emit('map-change', params);
            },
            back() {
                // console.log(this.deepTree)
                if (this.deepTree.length > 1) {
                    this.mapData = this.deepTree[this.deepTree.length - 1].mapData;
                    this.deepTree.pop();
                    // console.log(this.deepTree[this.deepTree.length - 1], 'back');
                    this.loadMapData(this.deepTree[this.deepTree.length - 1].code)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #china_map_box {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        .echarts {
            width: 0;
            flex: 1;
            background-size: 100% 100%;
            #map {
                height: 100%;
            }
        }
        .back {
            position: absolute;
            top: .8rem;
            right: .5rem;
            z-index: 999;
        }

    }

</style>

