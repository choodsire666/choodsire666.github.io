---
title: VUE
urlname: zqezgyiyyccmpoqa
date: '2024-03-23 10:49:34'
updated: '2024-04-21 18:09:42'
cover: 'https://raw.githubusercontent.com/choodsire666/blog-img/main/VUE/f07a980819da2acad9fc0f9c94dfa78a.png'
description: "笔记模板语法插值语法功能：用于解析标签体内容\t\t\t\t\t\t\t\t写法：{{xxxx}},xxx会作为表达式去解析，且可以自动读取到data中的属性指令语法功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）\t\t\t\t\t\t\t\t举例：v-bind:href=\"xxxxxx\" 或  简写为..."
---
# 笔记
## 模板语法
### 插值语法

- 功能：用于解析标签体内容								
- 写法：`{{xxxx}}`,xxx会作为表达式去解析，且可以自动读取到data中的属性
### 指令语法

- 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）								
- 举例：`v-bind:href="xxxxxx"` 或  简写为**:**
- 备注：Vue中有很多的指令，此处我们只是拿`v-bind`举个例子
```sql
<div id="root">
  <h2>插值语法</h2>
  <h4>你好，{{msg}}</h4>
  <h4>你好，{{msg.toUpperCase()}}</h4>
  <hr/>
  <h2>指令语法</h2>
  <a v-bind:href="url">点我去学习1</a>
  <a :href="url">点我去学习2</a>
  <a href="http://www.atguigu.com" :x="msg">点我去学习3</a>
</div>
```
## 数据绑定
```sql
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>数据绑定</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
				1.单向数据绑定(v-bind)：数据只能从data流向页面
				2.双向数据绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data
				备注：
						1.双向数据绑定一般都是针对表单类元素
						2.v-model:value 可以简写为 v-model，因为v-model默认收集value值。
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<!-- 
				单向数据绑定（v-bind）: <input type="text" v-bind:value="msg"> <br/><br/>
				双向数据绑定（v-model）: <input type="text" v-model:value="msg">
		 	-->
			单向数据绑定（v-bind）: <input type="text" :value="msg"> <br/><br/>
			双向数据绑定（v-model）: <input type="text" v-model="msg">
		</div>

		<script type="text/javascript" >
			new Vue({
				el:'#root',
				data:{
					msg:'尚硅谷'
				}
			})
		</script>
	</body>
</html>
```
## MVVM模型
![](https://raw.githubusercontent.com/choodsire666/blog-img/main/VUE/f07a980819da2acad9fc0f9c94dfa78a.png)
```sql
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>MVVM模型</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
			MVVM的理解：
					1. M：模型(Model) ：对应data中的数据
					2. V：视图(View) ：模板代码
					3. VM：视图模型(ViewModel) ： Vue实例对象
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>Hello，{{msg}}</h2>
			<h2>地址是：{{address}}</h2>
		</div>

		<script type="text/javascript" >
			//创建一个VUe实例对象
			const vm = new Vue({
				el:'#root',
				data:{
					msg:'尚硅谷',
					address:'宏福科技园综合楼'
				}
			})

			//观察发现：通过vm能看到data中的属性（注意不是看到data）
			setTimeout(()=>{
				console.log(vm.msg) //通过vm可以读取data中的数据
				vm.msg = 'atguigu' //通过vm可以修改data中的数据，且修改后页面会自动更新
			},1000)

		</script>
	</body>
</html>
```
## 数据代理
```vue
<!DOCTYPE html>
  <html>
    <head>
    <meta charset="UTF-8" />
    <title>数据代理</title>
    <script type="text/javascript" src="../js/vue.js"></script>
                                                                 </head>
                                                                   <body>
                                                                   <!-- 
                                                                   关于Vue中的数据代理：
      1.什么是数据代理？
        (1).配置对象data中的数据，会被收集到vm._data中，然后通过，Object.defineProperty让vm上拥有data中所有的属性。
        (2).当访问vm的msg时，返回的是_data当中同名属性的值
        (3).当修改vm的msg时，修改的是_data当中同名属性的值
      2.为什么要数据代理？
      为了更加方便的读取和修改_data中的数据，不做数据代理，就要：vm._data.xxx访问数据
      3.扩展思考？—— 为什么要先收集在_data中，然后再代理出去呢？
      更高效的监视数据（直接收集到vm上会导致监视效率太低）
      -->

        <!-- 准备好一个容器-->
        <div id="root">
        <h2>学校名字：{{name}}</h2>
        <h2>学校地址：{{address}}</h2>
        <h2>学科：{{subject}}</h2>
        </div>

        <script type="text/javascript" >
        const vm = new Vue({
        el:'#root',
        data:{
          name:'尚硅谷',
          address:'宏福科技园综合楼',
          subject:'前端',
        }
      })
      console.log(vm.address) //通过vm可以读取data中的address
      vm.address = '北七家镇' //通过vm可以修改data中的address
    </script>

               </body>
                 </html>
```

## 事件处理
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>事件处理</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
				事件绑定注意事项：
						1.事件的回调都配置在methods对象中
						2.methods中的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象
						3.methods中的配置的函数，不要用箭头函数！！！！，否则this丢失
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>欢迎来到{{school}}学习</h2>

			<!-- 绑定事件---标准方式 -->
			<button v-on:click="show1">点我提示：信息1（v-on绑定）</button> <br/><br/>

			<!-- 绑定事件---简写方式 -->
			<button @click="show1">点我提示：信息1（@绑定）</button> <br/><br/>

			<!-- 绑定事件---传递参数 -->
			<button @click="show2($event,666)">点我提示：信息2 + 传递的参数</button> <br/><br/>

			<!-- 绑定事件---阻止默认行为，prevent叫事件修饰符 -->
			<a href="https://www.baidu.com" @click.prevent="show3">点我提示：信息3 （阻止默认行为）</a> <br/><br/>

			<!-- 绑定事件---阻止冒泡，事件修饰符可以连写，且顺序可以随意改变 -->
			<div @click="show4">
				<a href="https://www.baidu.com" @click.stop.prevent="show4">点我提示：信息4 （阻止冒泡）</a>
			</div><br/>

			<!-- 键盘事件 -->
			<input @keyup.enter="show5" type="text" placeholder="按下回车提示数据">
			<!-- <input @keyup.13="show5" type="text" placeholder="按下回车提示数据"> -->
			<!-- <input @keyup.37="show5" type="text" placeholder="按下左箭头提示数据"> -->
			<!-- <input @keyup.arrow-left="show5" type="text" placeholder="按下左箭头提示数据"> -->
			<!-- <input @keyup.left="show5" type="text" placeholder="按下左箭头提示数据"> -->
			<!-- <input @keyup.16="show5" type="text" placeholder="按下shift提示数据"> -->
			
		</div>

		<script type="text/javascript" >
			new Vue({
				el:'#root',
				data:{ //配置数据
					school:'尚硅谷',
				},
				methods:{ //用于配置方法
					show1(event){ //此处的show1一定一定不要写成箭头函数，否则this就是Window了
						//console.log(this) //this是vm
						//console.log('信息1',event.target.innerText)
						alert('信息1')
					},
					show2(event,number){
						console.log(event)
						alert('信息2---'+number)
					},
					show3(event){
						//event.preventDefault(); //靠程序员手动阻止默认行为
						alert('信息3')
					},
					show4(event){
						// event.stopPropagation(); //靠程序员手动阻止冒泡
						alert('信息4')
					},
					show5(event){
						// if(event.keyCode !== 13) return //靠程序员自己判断按键
						// console.log(event.keyCode) //输出按键编码值
						// console.log(event.key) //输出按键名称
						alert(event.target.value) 
					}
				}
			})

		</script>
	</body>
</html>
```
## 计算属性computed
### 插值语法实现
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>姓名案例_插值语法实现</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			姓：<input type="text" v-model="firstName"> <br/>
			名：<input type="text" v-model="lastName"><br/>
			<span>全名:{{firstName + '-' + lastName}}</span>
		</div>

		<script type="text/javascript" >
			new Vue({
				el:'#root',
				data:{
					firstName:'张',
					lastName:'三'
				}
			})
		</script>

	</body>
</html>
```
### methods实现
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>姓名案例_methods实现</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			姓：<input type="text" v-model="firstName"> <br/>
			名：<input type="text" v-model="lastName"><br/>
			<span>全名:{{getFullName()}}</span>
			<span>全名:{{getFullName()}}</span>
		</div>

		<script type="text/javascript" >
			new Vue({
				el:'#root',
				data:{
					firstName:'张',
					lastName:'三'
				},
				methods:{
					getFullName(){
						console.log('getFullName被调用了')
						return this.firstName + '-' + this.lastName
					}
				}
			})
		</script>
	</body>
</html>
```
### computed实现
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>姓名案例_computed实现</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
				1.计算属性：要显示的数据不存在，要通过计算得来。
				2.fullName函数底层用到的是对象setter和getter方法
				3.执行的时机：
						(1).初始显示会执行一次，得到初始值去显示。
						(2).当依赖的数据发生改变时会被再次调用。
				4.优势：与methods实现相比，内部有缓存机制，效率更高。
				5.备注：计算属性是用于直接读取使用的，不要加()
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			姓：<input type="text" v-model="firstName"> <br/><br/>
			名：<input type="text" v-model="lastName"><br/><br/>
			<span>全名:{{fullName}}</span><br/><br/>
			<span>全名:{{fullName}}</span><br/><br/>
			全名: <input type="text" v-model="fullName">
		</div>

		<script type="text/javascript" >
			const vm = new Vue({
				el:'#root',
				data:{
					firstName:'张',
					lastName:'三',
				},
				computed:{
					/* 
						1.fullName是谁在调用？---Vue
						2.fullName什么时候调用？初次渲染会调用、当依赖的属性值发生变化
					*/
					//简写---相当与只指定了get，没有指定set
					fullName(){ 
						console.log('fullName')
						return this.firstName + '-' + this.lastName
					}
					
					//完整写法----set和get都指定了
					/* fullName:{
						set(value){ //fullName被修改时set被调用，set中的this是vm，set会收到修改的值
							const arr = value.split('-')
							this.firstName = arr[0]
							this.lastName = arr[1]
						},
						get(){ //fullName被读取时get被调用，get中的this是vm
							console.log('get')
							return this.firstName + '-' + this.lastName
						}
					} */
				}
			})

			console.log(vm)
		</script>
	</body>
</html>
```
### data methods computed总结
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>data_methods_computed总结</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>{{x}}</h2>
			<h2>{{y()}}</h2>
			<h2>{{z}}</h2>
			<button @click="y">点我调用y方法</button> <br/><br/>
			<button @click="y()">点我调用y方法</button> <br/><br/>
			展示x的值：<input type="text" v-model="x">
		</div>
		
		<script type="text/javascript" >
			const vm = new Vue({
				el:'#root', //指定vm为哪个容器服务
				data:{ //驱动页面显示的数据都放在这里
					x:100 //x最终会通过数据代理的方式放在vm身上
				},
				methods:{ //所有用到的函数都配置在这里
					y(){ //y直接被放在vm身上
						console.log('y被调用了')
						return 200
					}
				},
				computed:{
					z:{ //z直接被放在vm身上了
						set(value){ //z的值被改变时，set执行，set中的this是vm，set会收到修改的值
							console.log('有人修改z了，修改的值为：',value)
						},
						get(){ //z的值被读取时，或z依赖的值发生变化时，get执行，get中的this是vm，前提是：页面中要用到z
							console.log('get被调用了')
							return this.x*1 +1
						}
					}
				}
			})

			console.log(vm)
		</script>
	</body>
</html>
```
## 数据监视watch
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>姓名案例_watch实现</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
			监视属性watch：
						1.当被监视的属性变化时, 回调函数自动调用, 进行相关操作
						2.属性必须存在，才能进行监视！！
						3.监视的两种写法：
								(1).new Vue时传入watch配置
								(2).通过vm.$watch监视
					computed和watch之间的区别：
							1.只要是computed能完成的功能，watch都可以完成
							2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作
					备注：
							1.所有被Vue所调用（管理）的函数，都不要写箭头函数 ----- 例如：watch中的函数、computed中的函数
							2.所有不是被Vue所调（管理）的函数，都要写成箭头函数 --- 例如：定时器的回调、ajax的回调等等
							3.watch就是Vue给我提供的一个监测数据改变的手段，至于数据发生改变后，要做什么，得看具体的业务了逻辑。
								例如：
										需要新的值、旧的值作比较，决定接下来要干什么
										不要值，只要数据改变了，就要发请求等等
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			姓：<input type="text" v-model="firstName"> <br/><br/>
			名：<input type="text" v-model="lastName"><br/><br/>
			<span>全名:{{fullName}}</span><br/><br/>
		</div>

		<script type="text/javascript" >
			const vm = new Vue({
				el:'#root',
				data:{
					firstName:'张',
					lastName:'三',
					fullName:''
				},
				watch:{
					/* 
							1.watch中的firstName什么时候调用？data中的firstName被改变的时调用
							2.watch中的firstName的this是谁？---vm
					*/

					//监测姓-----精简写法
					/* firstName(newValue,oldValue){
						// console.log('firstName被别人改了',newValue,oldValue)
						this.fullName = newValue + '-' + this.lastName
					}, */

					//监测姓-----完整写法
					/* firstName:{
						immediate:true, //若immediate为true则handler在初始化时，就会调用一次，以后就看firstName的改变了
						handler(newValue,oldValue){
							this.fullName = newValue + '-' + this.lastName
						}
					}, */

					//监测名-----精简写法
					lastName(newValue,oldValue){
						// console.log('firstName被别人改了',newValue,oldValue)
						this.fullName = this.firstName + '-' + newValue
					}
				}
			})
			
			vm.$watch('firstName',{
					immediate:true, //若immediate为true则handler在初始化时，就会调用一次，以后就看firstName的改变了
					handler(newValue,oldValue){
						setTimeout(()=>{ //此处定时器的回调一定要写箭头函数
							this.fullName = newValue + '-' + this.lastName
						},1000)
					}
			})
			console.log(vm)
		</script>
	</body>
</html>
```
## 绑定样式
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>绑定样式</title>
		<script type="text/javascript" src="../js/vue.js"></script>
		<style>
			.atguigu{
				border: 3px solid black;
			}
			.classA{
				background-color: skyblue;
			}
			.classB{
				color: red;
			}
			.classC{
				text-shadow: 2px 2px 3px yellow;
			}
		</style>
	</head>
	<body>
		<!--
				1. 绑定class样式
							:class="xxx" xxx可以是字符串、对象、数组
				2. 绑定style样式
							:style="{fontSize: size + 'px' }"
											其中size是data属性
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			
			<!-- class的字符串写法，适用于：类名不确定，要动态获取 -->
			<h2 class="atguigu" :class="myStyle">{{title}}</h2>

			<!--class的对象写法，适用于：类名确定，但不确定用不用  -->
			<h2 class="atguigu" :class="{classB:hasB,classC:hasC}">{{title}}</h2>

			<!--class的三元表达式写法，适用于：类名确定，但不确定用不用  -->
			<h2 class="atguigu" :class="hasB ? 'classB' : '' ">{{title}}</h2>

			<!--class的数组写法，适用于：同时应用多个class  -->
			<h2 class="atguigu" :class="[a,b,c]">{{title}}</h2>

			<!-- 绑定style -->
			<h2 class="atguigu" :class="[a,b,c]" :style="{fontSize:size+'px'}">{{title}}</h2>

		</div>

		<script type="text/javascript" >
			new Vue({
				el:"#root",
				data:{
					title:'0922的同学过年好',
					myStyle:'classA',
					hasB:true, //标识是否使用classB样式
					hasC:true, //标识是否使用classC样式
					a:'classA',
					b:'classB',
					c:'classC',
					size:40
				}
			})
		</script>
	</body>
</html>
```
## 条件渲染
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>条件渲染</title>
		<script type="text/javascript" src="../js/vue.js"></script>
		<style>
			img{
				width: 100px;
			}
		</style>
	</head>
	<body>
		<!-- 
			条件渲染：
					v-if:
						适用于：切换频率很低的场景
						特点：不展示的DOM节点直接被删除

					v-show:
						适用于：切换频率很高的场景
						特点：不展示的DOM节点没有被删除，仅仅是使用样式隐藏掉
					
					严重注意：使用v-if的时，DOM节点可能无法获取到，而使用v-show一定可以获取到DOM节点。
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>今天天气很{{isHot ? '炎热' : '凉爽'}}</h2>
			<button @click="isHot = !isHot">切换天气</button>

			<!-- 使用v-show做条件渲染 -->

			<!-- 只有天气炎热，才会展示下面的div -->
			<div v-show="isHot">
				<img src="https://s3.ax1x.com/2020/12/13/reC1IA.jpg" alt=""><br/>
				<span>建议：心境自然就会凉</span>
			</div>

			<!-- 只有天气凉爽，才会展示下面的div -->
			<div v-show="!isHot">
				<img src="https://s3.ax1x.com/2020/12/13/reCaqg.jpg" alt=""><br/>
				<span>建议：妈妈告诉你要穿秋裤了</span>
			</div>

			<!-- ---------------------------------------------------------- -->
			<!-- 使用v-if、v-else-if、v-else做条件渲染 -->
			<!-- <div v-if="isHot">
				<img src="https://s3.ax1x.com/2020/12/13/reC1IA.jpg" alt=""><br/>
				<span>建议：心境自然就会凉</span>
			</div> -->

			<!-- <div v-else>
				<img src="https://s3.ax1x.com/2020/12/13/reCaqg.jpg" alt=""><br/>
				<span>建议：妈妈告诉你要穿秋裤了</span>
			</div> -->

		</div>

		<script type="text/javascript" >
			const vm = new Vue({
				el:"#root",
				data:{
					isHot:false
				}
			})
		</script>
	</body>
</html>
```
## 列表渲染
### 基本列表
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>基本列表</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
				v-for指令:
					1.用于展示列表数据
					2.语法：v-for="(item, index) in arr" :key="item.id"
					3.可遍历：数组、对象、字符串
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>人员列表</h2>
			<ul>
				<!-- 使用v-for遍历数组 -->
				<li v-for="(p,index) in persons" :key="p.id">
					{{p.name}}--{{p.sex}}--{{p.age}}岁
				</li>
			</ul>
			<h2>汽车信息</h2>
			<ul>
				<!-- 使用v-for遍历对象 -->
				<li v-for="(value,key) in car" :key="key">{{value}}</li>
			</ul>
			<h2>测试遍历字符串</h2>
			<ul>
				<!-- 使用v-for遍历字符串 -->
				<li v-for="(data,index) in str" :key="index">{{data}}--{{index}}</li>
			</ul>
		</div>

		<script type="text/javascript" >
			new Vue({
				el:'#root',
				data:{
					persons:[
						{id:'001',name:'老刘',age:20,sex:'男'},
						{id:'002',name:'老李',age:19,sex:'女'},
						{id:'003',name:'老王',age:18,sex:'男'},
						{id:'004',name:'老张',age:17,sex:'女'},
					],
					car:{
						name:'奔驰c63',
						price:'60万',
						color:'灰色'
					},
					str:'abcde',
				}
			})
		</script>
	</body>
</html>
```
### 列表过滤

```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>基本列表</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
			想要对数据加工后再展示，且不想破坏原数据，最好用计算属性。
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>人员列表</h2>
			<input v-model="keyWord" type="text" placeholder="请输入姓名">
			<ul>
				<li v-for="(p,index) in fmtPersons" :key="p.id">
					{{p.name}}--{{p.sex}}--{{p.age}}岁
				</li>
			</ul>
		</div>

		<script type="text/javascript" >
			new Vue({
				el:'#root',
				data:{
					keyWord:'',
					persons:[
						{id:'001',name:'马冬梅',age:35,sex:'女'},
						{id:'002',name:'周冬雨',age:20,sex:'女'},
						{id:'003',name:'周杰伦',age:41,sex:'男'},
						{id:'004',name:'温兆伦',age:25,sex:'男'},
					]
				},

				//使用computed过滤，优势：不影响原数据
				computed:{
					fmtPersons(){
						const {persons,keyWord} = this
						return persons.filter( p => p.name.indexOf(keyWord) !== -1)
					}
				}

				//在watch修改原数据，会导致原数据的丢失
				/* watch:{
					keyWord(value){
						const arr = this.persons.filter( p => p.name.indexOf(value) !== -1)
						this.persons = arr
					}
				} */
			})
		</script>
	</body>
</html>
```
### 列表排序
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>列表排序</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
			想要对数据加工后再展示，且不想破坏原数据，最好用计算属性。
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>人员列表</h2>
			<input v-model="keyWord" type="text" placeholder="请输入姓名">
			<button @click="sortType = 1">年龄升序↓</button>
			<button @click="sortType = 2">年龄降序↓</button>
			<button @click="sortType = 0">原顺序</button>
			<ul>
				<li v-for="(p,index) in fmtPersons" :key="p.id">
					{{p.name}}--{{p.sex}}--{{p.age}}岁
				</li>
			</ul>
		</div>

		<script type="text/javascript" >
			new Vue({
				el:'#root',
				data:{
					keyWord:'',
					sortType:0, //0原顺序 1升序  2降序
					persons:[
						{id:'001',name:'马冬梅',age:35,sex:'女'},
						{id:'002',name:'周冬雨',age:20,sex:'女'},
						{id:'003',name:'周杰伦',age:41,sex:'男'},
						{id:'004',name:'温兆伦',age:25,sex:'男'},
					]
				},

				//使用computed过滤，优势：不影响原数据
				computed:{
					fmtPersons(){
						const {persons,keyWord,sortType} = this
						//根据关键词过滤
						let arr =  persons.filter( p => p.name.indexOf(keyWord) !== -1)
						//若需要排序
						if(sortType){
							//排序
							arr.sort((a,b)=>{
								if(sortType === 1) return a.age - b.age
								else return b.age - a.age
							})
						}
						return arr
					}
				}

				//在watch修改原数据，会导致原数据的丢失
				/* watch:{
					keyWord(value){
						const arr = this.persons.filter( p => p.name.indexOf(value) !== -1)
						this.persons = arr
					}
				} */
			})
		</script>
	</body>
</html>
```
### 列表更新
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>列表更新</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
			Vue数据绑定的原理
					1. vue会监视data中所有层次对象的属性
					2. 对象中的属性数据通过添加set方法来来实现监视
					3. 数组中也实现了监视: 重写数组一系列更新元素的方法，做了两件事：
								1).调用原生对应的方法对数组进行处理
								2).去更新界面
		-->
		<!-- 准备好一个容器-->
		<div id="root">
			<h2>人员列表</h2>
			<input v-model="keyWord" type="text" placeholder="请输入姓名">
			<button @click="sortType = 1">年龄升序↓</button>
			<button @click="sortType = 2">年龄降序↓</button>
			<button @click="sortType = 0">原顺序</button>
			<button @click="updateMei">更改马冬梅的信息</button>
			<ul>
				<li v-for="(p,index) in fmtPersons" :key="p.id">
					{{p.name}}--{{p.sex}}--{{p.age}}岁
				</li>
			</ul>
		</div>

		<script type="text/javascript" >
			const vm = new Vue({
				el:'#root',
				data:{
					keyWord:'',
					sortType:0, //0原顺序 1升序  2降序
					persons:[
						{id:'001',name:'马冬梅',age:35,sex:'女',a:{b:{c:{d:{e:1}}}}},
						{id:'002',name:'周冬雨',age:20,sex:'女'},
						{id:'003',name:'周杰伦',age:41,sex:'男'},
						{id:'004',name:'温兆伦',age:25,sex:'男'},
					]
				},

				methods:{
					updateMei(){
						console.log(this)
						// this.persons[0].name = '小佩奇' //代码奏效
						// this.persons[0].age = 99 //代码奏效
						// this.persons[0].sex = '男' //代码奏效
						this.persons[0] = {name:'小佩奇',age:99,sex:'男'} //不奏效
					}
				},

				//使用computed过滤，优势：不影响原数据
				computed:{
					fmtPersons(){
						const {persons,keyWord,sortType} = this
						//根据关键词过滤
						let arr =  persons.filter( p => p.name.indexOf(keyWord) !== -1)
						//若需要排序
						if(sortType){
							//排序
							arr.sort((a,b)=>{
								if(sortType === 1) return a.age - b.age
								else return b.age - a.age
							})
						}
						return arr
					}
				}
			})
		</script>
	</body>
</html>
```
## 收集表单数据
```vue
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>收集表单数据</title>
		<script type="text/javascript" src="../js/vue.js"></script>
	</head>
	<body>
		<!-- 
			若是：<input type="text"/>，则v-model收集的是value值
			若是：<input type="radio"/>，则v-model收集的是value值
			若是：<input type="checkbox"/>
							1.没有配置input的value属性，那么收集的的就是checked（勾选 or 未勾选，是布尔值）
							2.配置input的value属性:
										(1).v-model的初始值是非数组，那么收集的的就是checked（勾选 or 未勾选，是布尔值）
										(2).v-model的初始值是数组，那么收集的的就是value组成的数组
		 -->
		<!-- 准备好一个容器-->
		<div id="root">
			<form @submit.prevent="submit">
				账号：<input type="text" v-model="userInfo.account"> 
				<br/><br/>
				密码：<input type="password" v-model="userInfo.password">
				<br/><br/>
				性别：男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
							女<input type="radio" name="sex" v-model="userInfo.sex" value="female">
				<br/><br/>
				爱好：抽烟 <input type="checkbox"  v-model="userInfo.hobby" value="smoke">
							喝酒 <input type="checkbox"  v-model="userInfo.hobby" value="drink">
							开车 <input type="checkbox"  v-model="userInfo.hobby" value="drive">
				<br/><br/>
				所属校区：<select v-model="userInfo.city">
										<option value="">请选择校区</option>
										<option value="beijing">北京</option>
										<option value="shanghai">上海</option>
										<option value="shenzhen">深圳</option>
										<option value="wuhan">武汉</option>
								 </select>
				<br/><br/>
				其他信息：<textarea v-model="userInfo.other" cols="30" rows="10"></textarea>
				<br/><br/>
				<input v-model="userInfo.agree" type="checkbox">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
				<br/><br/>
				<button>提交</button>
			</form>
		</div>

		<script type="text/javascript" >
			new Vue({
				el:'#root',
				data:{
					userInfo:{
						account:'',
						password:'',
						sex:'',
						hobby:[],
						city:'',
						other:'',
						agree:false,
					}
				},
				methods:{
					submit(){
						console.log(this.userInfo)
					}
				}
			})
		</script>
	</body>
</html>
```
## 脚手架文件结构

```
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```
## 关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别： 
   1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
   2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

## vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：[https://cli.vuejs.org/zh](https://cli.vuejs.org/zh)

## ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式： 
   1. 打标识：`<h1 ref="xxx">.....</h1>` 或 `<School ref="xxx"></School>`
   2. 获取：`this.$refs.xxx`

## props配置项

1.  功能：让组件接收外部传过来的数据 
2.  传递数据：`<Demo name="xxx"/>` 
3.  接收数据： 
   1.  第一种方式（只接收）：`props:['name']` 
   2.  第二种方式（限制类型）：`props:{name:String}` 
   3.  第三种方式（限制类型、限制必要性、指定默认值）： 
```javascript
props:{
	name:{
	type:String, //类型
	required:true, //必要性
	default:'老王' //默认值
	}
}
```
 
> 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。


## mixin(混入)

1.  功能：可以把多个组件共用的配置提取成一个混入对象 
2.  使用方式：
第一步定义混合： 
```
{
    data(){....},
    methods:{....}
    ....
}
```

第二步使用混入：
	全局混入：`Vue.mixin(xxx)`
	局部混入：`mixins:['xxx']` 

## 插件

1.  功能：用于增强Vue 
2.  本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。 
3.  定义插件： 
```javascript
对象.install = function (Vue, options) {
    // 1. 添加全局过滤器
    Vue.filter(....)

    // 2. 添加全局指令
    Vue.directive(....)

    // 3. 配置全局混入(合)
    Vue.mixin(....)

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function () {...}
    Vue.prototype.$myProperty = xxxx
}
```
 

4.  使用插件：`Vue.use()` 

## scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：`<style scoped>`

## 总结TodoList案例

1.  组件化编码流程：
	(1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
	(2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
			1).一个组件在用：放在组件自身即可。
			2). 一些组件在用：放在他们共同的父组件上（状态提升）。
	(3).实现交互：从绑定事件开始。 
2.  props适用于：
	(1).父组件 ==> 子组件 通信
	(2).子组件 ==> 父组件 通信（要求父先给子一个函数） 
3.  使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！ 
4.  props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。 

## webStorage

1.  存储内容大小一般支持5MB左右（不同浏览器可能还不一样） 
2.  浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。 
3.  相关API： 
   1.  `xxxxxStorage.setItem('key', 'value');`
该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。 
   2.  `xxxxxStorage.getItem('person');`
		该方法接受一个键名作为参数，返回键名对应的值。 
   3.  `xxxxxStorage.removeItem('key');`
		该方法接受一个键名作为参数，并把该键名从存储中删除。 
   4.  `xxxxxStorage.clear()`
		该方法会清空存储中的所有数据。 
4.  备注： 
   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage存储的内容，需要手动清除才会消失。
   3. `xxxxxStorage.getItem(xxx)`如果xxx对应的value获取不到，那么getItem的返回值是null。
   4. `JSON.parse(null)`的结果依然是null。

## 组件的自定义事件

1.  一种组件间通信的方式，适用于：**子组件 ===> 父组件** 
2.  使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。 
3.  绑定自定义事件： 
   1.  第一种方式，在父组件中：`<Demo @atguigu="test"/>`  或 `<Demo v-on:atguigu="test"/>` 
   2.  第二种方式，在父组件中： 
```javascript
<Demo ref="demo"/>
......
mounted(){
   this.$refs.xxx.$on('atguigu',this.test)
}
```
 

   3.  若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。 
4.  触发自定义事件：`this.$emit('atguigu',数据)` 
5.  解绑自定义事件`this.$off('atguigu')` 
6.  组件上也可以绑定原生DOM事件，需要使用`native`修饰符。 
7.  注意：通过`this.$refs.xxx.$on('atguigu',回调)`绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题！ 

## 全局事件总线（GlobalEventBus）

1.  一种组件间通信的方式，适用于任意组件间通信。 
2.  安装全局事件总线： 
```javascript
new Vue({
	......
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
    ......
})
```
 

3.  使用事件总线： 
   1.  接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。 
```javascript
methods(){
  demo(data){......}
}
......
mounted() {
  this.$bus.$on('xxxx',this.demo)
}
```
 

   2.  提供数据：`this.$bus.$emit('xxxx',数据)` 
4.  最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。 

## 消息订阅与发布（pubsub）

1.  一种组件间通信的方式，适用于任意组件间通信。 
2.  使用步骤： 
   1.  安装pubsub：`npm i pubsub-js` 
   2.  引入: `import pubsub from 'pubsub-js'` 
   3.  接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。 
```javascript
methods(){
  demo(data){......}
}
......
mounted() {
  this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
}
```
 

   4.  提供数据：`pubsub.publish('xxx',数据)` 
   5.  最好在beforeDestroy钩子中，用`PubSub.unsubscribe(pid)`去取消订阅。 

## nextTick

1. 语法：`this.$nextTick(回调函数)`
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## Vue封装的过度与动画

1.  作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。 
2.  图示：![](https://img04.sogoucdn.com/app/a/100520146/5990c1dff7dc7a8fb3b34b4462bd0105#id=PxBQB&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=) 
3.  写法： 
   1.  准备好样式： 
      - 元素进入的样式： 
         1. v-enter：进入的起点
         2. v-enter-active：进入过程中
         3. v-enter-to：进入的终点
      - 元素离开的样式： 
         1. v-leave：离开的起点
         2. v-leave-active：离开过程中
         3. v-leave-to：离开的终点
   1.  使用`<transition>`包裹要过度的元素，并配置name属性： 
```vue
<transition name="hello">
	<h1 v-show="isShow">你好啊！</h1>
</transition>
```
 

   2.  备注：若有多个元素需要过度，则需要使用：`<transition-group>`，且每个元素都要指定`key`值。 

## vue脚手架配置代理

### 方法一

	在vue.config.js中添加如下配置：

```javascript
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

### 方法二

	编写vue.config.js配置具体代理规则：

```javascript
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

## 插槽

1.  作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 **父组件 ===> 子组件** 。 
2.  分类：默认插槽、具名插槽、作用域插槽 
3.  使用方式： 
   1.  默认插槽： 
```vue
父组件中：
        <Category>
           <div>html结构1</div>
        </Category>
子组件中：
        <template>
            <div>
               <!-- 定义插槽 -->
               <slot>插槽默认内容...</slot>
            </div>
        </template>
```
 

   2.  具名插槽： 
```vue
父组件中：
        <Category>
            <template slot="center">
              <div>html结构1</div>
            </template>

            <template v-slot:footer>
               <div>html结构2</div>
            </template>
        </Category>
子组件中：
        <template>
            <div>
               <!-- 定义插槽 -->
               <slot name="center">插槽默认内容...</slot>
               <slot name="footer">插槽默认内容...</slot>
            </div>
        </template>
```
 

   3.  作用域插槽： 
      1.  理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定） 
      2.  具体编码： 
```vue
父组件中：
		<Category>
			<template scope="scopeData">
				<!-- 生成的是ul列表 -->
				<ul>
					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
				</ul>
			</template>
		</Category>

		<Category>
			<template slot-scope="scopeData">
				<!-- 生成的是h4标题 -->
				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
			</template>
		</Category>
子组件中：
        <template>
            <div>
                <slot :games="games"></slot>
            </div>
        </template>
		
        <script>
            export default {
                name:'Category',
                props:['title'],
                //数据在子组件自身
                data() {
                    return {
                        games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                    }
                },
            }
        </script>
```
 

## Vuex

### 1.概念

		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 2.何时使用？

		多个组件需要共享数据时

### 3.搭建vuex环境

1.  创建文件：`src/store/index.js` 
```javascript
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})
```
 

2.  在`main.js`中创建vm时传入`store`配置项 
```javascript
......
//引入store
import store from './store'
......

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	store
})
```
 

### 4.基本使用

1.  初始化数据、配置`actions`、配置`mutations`，操作文件`store.js` 
```javascript
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//引用Vuex
Vue.use(Vuex)

const actions = {
    //响应组件中加的动作
	jia(context,value){
		// console.log('actions中的jia被调用了',miniStore,value)
		context.commit('JIA',value)
	},
}

const mutations = {
    //执行加
	JIA(state,value){
		// console.log('mutations中的JIA被调用了',state,value)
		state.sum += value
	}
}

//初始化数据
const state = {
   sum:0
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
})
```
 

2.  组件中读取vuex中的数据：`$store.state.sum` 
3.  组件中修改vuex中的数据：`$store.dispatch('action中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)` 
> 备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写`dispatch`，直接编写`commit`

 

### 5.getters的使用

1.  概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。 
2.  在`store.js`中追加`getters`配置 
```javascript
......

const getters = {
	bigSum(state){
		return state.sum * 10
	}
}

//创建并暴露store
export default new Vuex.Store({
	......
	getters
})
```
 

3.  组件中读取数据：`$store.getters.bigSum` 

### 6.四个map方法的使用

1.  **mapState方法：**用于帮助我们映射`state`中的数据为计算属性 
```javascript
computed: {
    //借助mapState生成计算属性：sum、school、subject（对象写法）
     ...mapState({sum:'sum',school:'school',subject:'subject'}),
         
    //借助mapState生成计算属性：sum、school、subject（数组写法）
    ...mapState(['sum','school','subject']),
},
```
 

2.  **mapGetters方法：**用于帮助我们映射`getters`中的数据为计算属性 
```javascript
computed: {
    //借助mapGetters生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum:'bigSum'}),

    //借助mapGetters生成计算属性：bigSum（数组写法）
    ...mapGetters(['bigSum'])
},
```
 

3.  **mapActions方法：**用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数 
```javascript
methods:{
    //靠mapActions生成：incrementOdd、incrementWait（对象形式）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})

    //靠mapActions生成：incrementOdd、incrementWait（数组形式）
    ...mapActions(['jiaOdd','jiaWait'])
}
```
 

4.  **mapMutations方法：**用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数 
```javascript
methods:{
    //靠mapActions生成：increment、decrement（对象形式）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),
    
    //靠mapMutations生成：JIA、JIAN（对象形式）
    ...mapMutations(['JIA','JIAN']),
}
```
 

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。


### 7.模块化+命名空间

1.  目的：让代码更好维护，让多种数据分类更加明确。 
2.  修改`store.js` 
```javascript
const countAbout = {
  namespaced:true,//开启命名空间
  state:{x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}

const personAbout = {
  namespaced:true,//开启命名空间
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```
 

3.  开启命名空间后，组件中读取state数据： 
```javascript
//方式一：自己直接读取
this.$store.state.personAbout.list
//方式二：借助mapState读取：
...mapState('countAbout',['sum','school','subject']),
```
 

4.  开启命名空间后，组件中读取getters数据： 
```javascript
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取：
...mapGetters('countAbout',['bigSum'])
```
 

5.  开启命名空间后，组件中调用dispatch 
```javascript
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions：
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```
 

6.  开启命名空间后，组件中调用commit 
```javascript
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations：
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```
 

## 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。

### 1.基本使用

1.  安装vue-router，命令：`npm i vue-router` 
2.  应用插件：`Vue.use(VueRouter)` 
3.  编写router配置项: 
```javascript
//引入VueRouter
import VueRouter from 'vue-router'
//引入Luyou 组件
import About from '../components/About'
import Home from '../components/Home'

//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	routes:[
		{
			path:'/about',
			component:About
		},
		{
			path:'/home',
			component:Home
		}
	]
})

//暴露router
export default router
```
 

4.  实现切换（active-class可配置高亮样式） 
```vue
<router-link active-class="active" to="/about">About</router-link>
```
 

5.  指定展示位置 
```vue
<router-view></router-view>
```
 

### 2.几个注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的`$router`属性获取到。

### 3.多级路由（多级路由）

1.  配置路由规则，使用children配置项： 
```javascript
routes:[
	{
		path:'/about',
		component:About,
	},
	{
		path:'/home',
		component:Home,
		children:[ //通过children配置子级路由
			{
				path:'news', //此处一定不要写：/news
				component:News
			},
			{
				path:'message',//此处一定不要写：/message
				component:Message
			}
		]
	}
]
```
 

2.  跳转（要写完整路径）： 
```vue
<router-link to="/home/news">News</router-link>
```
 

### 4.路由的query参数

1.  传递参数 
```vue
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
				
<!-- 跳转并携带query参数，to的对象写法 -->
<router-link 
	:to="{
		path:'/home/message/detail',
		query:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
```
 

2.  接收参数： 
```javascript
$route.query.id
$route.query.title
```
 

### 5.命名路由

1.  作用：可以简化路由的跳转。 
2.  如何使用 
   1.  给路由命名： 
```javascript
{
	path:'/demo',
	component:Demo,
	children:[
		{
			path:'test',
			component:Test,
			children:[
				{
                      name:'hello' //给路由命名
					path:'welcome',
					component:Hello,
				}
			]
		}
	]
}
```
 

   2.  简化跳转： 
```vue
<!--简化前，需要写完整的路径 -->
<router-link to="/demo/test/welcome">跳转</router-link>

<!--简化后，直接通过名字跳转 -->
<router-link :to="{name:'hello'}">跳转</router-link>

<!--简化写法配合传递参数 -->
<router-link 
	:to="{
		name:'hello',
		query:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
```
 

### 6.路由的params参数

1.  配置路由，声明接收params参数 
```javascript
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component:News
		},
		{
			component:Message,
			children:[
				{
					name:'xiangqing',
					path:'detail/:id/:title', //使用占位符声明接收params参数
					component:Detail
				}
			]
		}
	]
}
```
 

2.  传递参数 
```vue
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>
				
<!-- 跳转并携带params参数，to的对象写法 -->
<router-link 
	:to="{
		name:'xiangqing',
		params:{
		   id:666,
            title:'你好'
		}
	}"
>跳转</router-link>
```
 
> 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

 

3.  接收参数： 
```javascript
$route.params.id
$route.params.title
```
 

### 7.路由的props配置

	作用：让路由组件更方便的收到参数

```javascript
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### 8.`<router-link>`的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时候默认为`push`
3. 如何开启`replace`模式：`<router-link replace .......>News</router-link>`

### 9.编程式路由导航

1.  作用：不借助`<router-link>`实现路由跳转，让路由跳转更加灵活 
2.  具体编码： 
```javascript
//$router的两个API
this.$router.push({
	name:'xiangqing',
		params:{
			id:xxx,
			title:xxx
		}
})

this.$router.replace({
	name:'xiangqing',
		params:{
			id:xxx,
			title:xxx
		}
})
this.$router.forward() //前进
this.$router.back() //后退
this.$router.go() //可前进也可后退
```
 

### 10.缓存路由组件

1.  作用：让不展示的路由组件保持挂载，不被销毁。 
2.  具体编码： 
```vue
<keep-alive include="News"> 
    <router-view></router-view>
</keep-alive>
```
 

### 11.两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字： 
   1. `activated`路由组件被激活时触发。
   2. `deactivated`路由组件失活时触发。

### 12.路由守卫

1.  作用：对路由进行权限控制 
2.  分类：全局守卫、独享守卫、组件内守卫 
3.  全局守卫: 
```javascript
//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	console.log('beforeEach',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
			next() //放行
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next() //放行
	}
})

//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to,from)=>{
	console.log('afterEach',to,from)
	if(to.meta.title){ 
		document.title = to.meta.title //修改网页的title
	}else{
		document.title = 'vue_test'
	}
})
```
 

4.  独享守卫: 
```javascript
beforeEnter(to,from,next){
	console.log('beforeEnter',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){
			next()
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next()
	}
}
```
 

5.  组件内守卫： 
```javascript
//进入守卫：通过路由规则，进入该组件时被调用
beforeRouteEnter (to, from, next) {
},
//离开守卫：通过路由规则，离开该组件时被调用
beforeRouteLeave (to, from, next) {
}
```
 

### 13.路由器的两种工作模式

1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式： 
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式： 
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。
## 

