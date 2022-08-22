<template>
    <div  class="summaryTab">
      <h1>1 实验介绍</h1>
      <h3>1.1 实验背景</h3>
      <p class="light-gray">{{summaryItem.description.background.text}}</p>
      <div v-if="summaryItem.description.background.pictures.length>0">
      <img style="margin-right:10px;width:150px;height:150px" v-for="item in summaryItem.description.background.pictures" :src="'http://172.21.213.216:8888/upload/getImg/'+item"/>
      </div>
      <div style="display: flex;align-items:flex-end;">
        <div v-if="summaryItem.description.background.video && summaryItem.description.background.video.id!=''">已上传视频：<el-tag>{{summaryItem.description.background.video.name}}</el-tag></div>
      </div>
      <h3>1.2 实验问题</h3>
      <p class="light-gray">{{summaryItem.description.purpose.text}}</p>
      <div v-if="summaryItem.description.purpose.pictures.length>0">
      <img style="margin-right:10px;width:150px;height:150px" v-for="item in summaryItem.description.purpose.pictures" :src="'http://172.21.213.216:8888/upload/getImg/'+item"/>
      </div>
      <div style="display: flex;align-items:flex-end;">
        <div v-if="summaryItem.description.purpose.video && summaryItem.description.purpose.video.id!=''">已上传视频：<el-tag>{{summaryItem.description.purpose.video.name}}</el-tag></div>
      </div>
      <h3>1.3 问题分析及设计</h3>
      <h4>(1) 研究目的</h4>
      <p class="light-gray">{{summaryItem.description.scheme.purpose}}</p>
      <h4>(2) 研究对象</h4>
      <p class="light-gray">{{summaryItem.description.scheme.target}}</p>
      <h4>(3) 研究时空尺度</h4>
      <div class="light-gray">
          <b>时间尺度：</b><br>
          <ul>
            <li>
              分辨率：{{summaryItem.description.scheme.time.resolution}}
            </li>
            <li>
              尺度：{{summaryItem.description.scheme.time.scale}}
            </li>
            <li>
              范围：{{summaryItem.description.scheme.time.scope}}
            </li>
            <li v-if="summaryItem.description.scheme.time.length">
              步长：{{summaryItem.description.scheme.time.length}}
            </li>
            <li v-if="summaryItem.description.scheme.time.unit">
              单位：{{summaryItem.description.scheme.time.unit}}
            </li>
          </ul>
      </div>
      <div class="light-gray">
          <b>空间尺度：</b><br>
          <ul>
            <li>
              分辨率：{{summaryItem.description.scheme.space.resolution}}
            </li>
            <li>
              尺度：{{summaryItem.description.scheme.space.scale}}
            </li>
            <li>
              范围：{{summaryItem.description.scheme.space.scope}}
            </li>
            <li>
              维度：{{summaryItem.description.scheme.space.length}}
            </li>
            <li v-if="summaryItem.description.scheme.space.unit">
              单位：{{summaryItem.description.scheme.space.unit}}
            </li>
          </ul>
      </div>

      <h4>(4) 研究方法</h4>
      <p class="light-gray">{{summaryItem.description.scheme.method}}</p>
      <div v-if="summaryItem.description.scheme.pictures.length>0">
      <img style="margin-right:10px;width:150px;height:150px" v-for="item in summaryItem.description.scheme.pictures" :src="'http://172.21.213.216:8888/upload/getImg/'+item"/>
      </div>
      <div style="display: flex;align-items:flex-end;">
        <div v-if="summaryItem.description.scheme.video && summaryItem.description.scheme.video.id!=''">已上传视频：<el-tag>{{summaryItem.description.scheme.video.name}}</el-tag></div>
      </div>
     <h3  v-if="summaryItem.researcher.persons.length>0">1.4 研究人员</h3>
      <ul v-if="summaryItem.researcher.persons.length>0">
        <li v-for="item in summaryItem.researcher.persons">
          <b>{{item.name}} {{item.appellation}}</b><br>
          <div class="light-gray">邮箱：{{item.email}}；隶属机构：{{item.institution}}；地址：{{item.address}}</div>
        </li>
      </ul>
      <div v-if="summaryItem.description.background.references.length>0">
      <h3>1.5 参考文献</h3>
      <ul style="list-style-type:none">
        <li v-for="(sitem,sindex) in summaryItem.description.background.references">
        {{'['+(sindex+1)+']'}}{{sitem}}
        </li>
      </ul>
      </div>
      <h1>2 实验方法</h1>
      <h3>2.1 研究资源</h3>
      <div v-if="summaryItem.method.resource.modelResources.length>0">
      <h4>(1) 模型资源</h4>

        <ul v-for="item in summaryItem.method.resource.modelResources">
          <el-card class="resourceCard">          
              <b>{{item.modelBaseInfo.name}}</b>
              <ul style="list-style-type:none">
                <li>
                <el-card class="card1">
                  <b>基础信息：</b>
                  <ul class="light-gray">
                    <li>
                      模型内容：{{item.modelBaseInfo.content}}
                    </li>
                    <li>
                      模型描述：{{item.modelBaseInfo.description}}
                    </li>
                    <li>
                      模型类型：{{item.modelBaseInfo.type}}
                    </li>
                    <li>
                      模型版本：{{item.modelBaseInfo.version}}
                    </li>
                    <li>
                      模型类型：{{item.modelBaseInfo.type}}
                    </li>
                    <li v-if="item.modelBaseInfo.type==='模块'">
                      软件需求：{{item.modelBaseInfo.softDemand}}
                    </li>
                    <li v-if="item.modelBaseInfo.type==='模块'">
                      软件版本：{{item.modelBaseInfo.softVersion}}
                    </li>
                    <li v-if="item.modelBaseInfo.type==='模块' && item.modelBaseInfo.storage!=''">
                      软件存储位置：{{item.modelBaseInfo.storage}}
                    </li>
                    <li v-if="item.modelBaseInfo.type==='服务' && item.modelBaseInfo.serverStorage!=''">
                      服务存储位置：{{item.modelBaseInfo.serverStorage}}
                    </li>
                    <li v-if="item.modelBaseInfo.type==='代码' && item.modelBaseInfo.algorithm!=''">
                      公式/算法：{{item.modelBaseInfo.algorithm}}
                    </li>
                    <li v-if="item.modelBaseInfo.type==='代码'">
                      代码内容：{{item.modelBaseInfo.codeContent}}
                    </li>
                    <li v-if="item.modelBaseInfo.type==='代码'">
                      编程语言：{{item.modelBaseInfo.language}}
                    </li>
                    <li v-if="item.modelBaseInfo.type==='代码'">
                      依赖库：{{item.modelBaseInfo.dependent}}
                    </li>
                    <li >
                      时间参考系类型：{{item.modelBaseInfo.refSystemTime.type}}；名称：{{item.modelBaseInfo.refSystemTime.name}}
                    </li>
                    <li >
                      空间参考系类型：{{item.modelBaseInfo.refSystemSpace.type}}；名称：{{item.modelBaseInfo.refSystemSpace.name}}
                    </li>
                    <li>
                      生产时间：{{item.modelBaseInfo.producteTime}}
                    </li>
                    <li v-if="item.modelBaseInfo.updateTime">
                      更新时间：{{item.modelBaseInfo.updateTime}}
                    </li>
                    <li v-if="item.modelBaseInfo.other">
                      其他补充：{{item.modelBaseInfo.other}}
                    </li>
                  </ul>
                </el-card>
                </li>
                <li>
                  <el-card class="card2">
                  <b>元数据信息：</b>
                  <ul class="light-gray">
                  <li v-if="item.modelMetaData.hypothesis">
                    模型假设：{{item.modelMetaData.hypothesis}}
                  </li>
                  <li v-if="item.modelMetaData.modelInputs.length>0">
                    输入信息：
                    <ol>
                      <li v-for="sitem in item.modelMetaData.modelInputs">
                        {{sitem.name}}<br>
                        <a>信息描述：{{sitem.description}}</a><a v-if="sitem.unit">，单位：{{sitem.unit}}</a><a v-if="sitem.defaultValue">，默认值：{{sitem.defaultValue}}</a><a v-if="sitem.format">，格式：{{sitem.format}}</a>
                      </li>
                    </ol>
                  </li>
                  <li v-if="item.modelMetaData.modelOutputs.length>0">
                    输出信息：
                    <ol>
                      <li v-for="sitem in item.modelMetaData.modelOutputs">
                        {{sitem.name}}<br>
                        <a>信息描述：{{sitem.description}}</a><a v-if="sitem.unit">，单位：{{sitem.unit}}</a><a v-if="sitem.defaultValue">，默认值：{{sitem.defaultValue}}</a><a v-if="sitem.format">，格式：{{sitem.format}}</a>
                      </li>
                    </ol>
                  </li>
                  <li v-if="item.modelMetaData.parameters.length>0">
                    参数信息：
                    <ol>
                      <li v-for="sitem in item.modelMetaData.parameters">
                        {{sitem.name}}<br>
                        <a>信息描述：{{sitem.description}}</a><a v-if="sitem.unit">，单位：{{sitem.unit}}</a><a v-if="sitem.defaultValue">，默认值：{{sitem.defaultValue}}</a><a v-if="sitem.format">，格式：{{sitem.format}}</a>
                      </li>
                    </ol>
                  </li>
                  <li v-if="item.modelMetaData.iterate">
                    迭代次数名称：{{item.modelMetaData.iterate.name}}<br>
                    <a>描述：{{item.modelMetaData.iterate.description}}</a><a>默认值：{{item.modelMetaData.iterate.name.defaultValue}}</a>
                  </li>
                  </ul>
                  </el-card>
                </li>
                <li>
                  <el-card class="card3">
                  <b>出处信息：</b>
                  <ul class="light-gray">
                    <li v-if="item.modelSource.references.length>0">
                      参考文献：
                      <ul style="list-style-type:none">
                        <li v-for="(sitem,sindex) in item.modelSource.references">
                        {{'['+(sindex+1)+']'}}{{sitem}}
                        </li>
                      </ul>
                    </li>
                    <li v-if="item.modelSource.publication">
                      出版机构：{{item.modelSource.publication}}
                    </li>
                    <li v-if="item.modelSource.develop">
                      发展机构：{{item.modelSource.develop}}
                    </li>
                    <li v-if="item.modelSource.UId">
                      唯一标识符：{{item.modelSource.UId}}
                    </li>
                    <li v-if="item.modelSource.license">
                      许可证明：{{item.modelSource.license}}
                    </li>
                  </ul>
                  </el-card>
                </li>
              </ul>
          </el-card>
        </ul>
      </div>
      <div v-if="summaryItem.method.resource.dataResources.length>0">
      <h4>(2) 数据资源</h4>
        
        <ul v-for="item in summaryItem.method.resource.dataResources">
        <el-card class="resourceCard">
          
            <b>{{item.dataBaseInfo.name}}</b>
            <ul style="list-style-type:none">
              <li>
              <el-card class="card1">
              <b>基础信息：</b>
                <ul class="light-gray">
                  <li>
                    数据描述：{{item.dataBaseInfo.description}}
                  </li>
                  <li>
                    数据类型：{{item.dataBaseInfo.type}}
                  </li>
                  <li v-if="item.dataBaseInfo.type==='输入参数'">
                    输入参数：{{item.dataBaseInfo.parameter}}
                  </li>
                  <div v-else>
                  <li v-if="item.dataBaseInfo.location!=''">
                    存储位置：{{item.dataBaseInfo.location}}
                  </li>
                  <li>
                    数据格式：{{item.dataBaseInfo.format}}
                  </li>
                  <li v-if="item.dataBaseInfo.version">
                    数据版本：{{item.dataBaseInfo.version}}
                  </li>
                  <li v-if="item.dataBaseInfo.produceTime">
                    生产时间：{{item.dataBaseInfo.produceTime}}
                  </li>
                  <li v-if="item.dataBaseInfo.updateTime">
                    更新时间：{{item.dataBaseInfo.updateTime}}
                  </li>
                  </div>
                  <li>
                    研究时空尺度
                    <div class="light-gray">
                        <b>时间尺度：</b><br>
                        <ul>
                          <li v-if="item.dataBaseInfo.time.resolution">
                            分辨率：{{item.dataBaseInfo.time.resolution}}
                          </li>
                          <li v-if="item.dataBaseInfo.time.scale">
                            尺度：{{item.dataBaseInfo.time.scale}}
                          </li>
                          <li v-if="item.dataBaseInfo.time.scope">
                            范围：{{item.dataBaseInfo.time.scope}}
                          </li>
                          <li v-if="item.dataBaseInfo.time.length">
                            步长：{{item.dataBaseInfo.time.length}}
                          </li>
                          <li v-if="item.dataBaseInfo.time.unit">
                            单位：{{item.dataBaseInfo.time.unit}}
                          </li>
                        </ul>
                    </div>
                    <div class="light-gray">
                        <b>空间尺度：</b><br>
                        <ul>
                          <li v-if="item.dataBaseInfo.space.resolution">
                            分辨率：{{item.dataBaseInfo.space.resolution}}
                          </li>
                          <li  v-if="item.dataBaseInfo.space.scale">
                            尺度：{{item.dataBaseInfo.space.scale}}
                          </li>
                          <li v-if="item.dataBaseInfo.space.scope">
                            范围：{{item.dataBaseInfo.space.scope}}
                          </li>
                          <li v-if="item.dataBaseInfo.space.length">
                            维度：{{item.dataBaseInfo.space.length}}
                          </li>
                          <li v-if="item.dataBaseInfo.space.unit">
                            单位：{{item.dataBaseInfo.space.unit}}
                          </li>
                        </ul>
                    </div>
                  </li>
                </ul>
              </el-card>
              </li>
              <li>
                <el-card class="card2">
                <b>活动信息：</b>
                <ul class="light-gray">
                <li v-if="item.dataActive.handleName!=''|| item.dataActive.handleDescription!=''">
                  数据处理步骤名称：{{item.dataActive.handleName}}，描述：{{item.dataActive.handleDescription}}
                </li>
                <li v-if="item.dataActive.conversionName!=''||item.dataActive.conversionDescription!=''">
                  数据转化步骤名称：{{item.dataActive.conversionName}}，描述：{{item.dataActive.conversionDescription}}
                </li>
                </ul>
                </el-card>
              </li>
              <li>
                <el-card class="card3">
                <b>出处信息/代理属性：</b>
                <ul class="light-gray">
                  <li  v-if="item.dataSource.references.length>0">
                    参考文献：
                    <ul style="list-style-type:none">
                      <li v-for="(sitem,sindex) in item.dataSource.references">
                      {{'['+(sindex+1)+']'}}{{sitem}}
                      </li>
                    </ul>
                  </li>
                  <li v-if="item.dataSource.publish">
                    出版机构：{{item.dataSource.publish}}
                  </li>
                  <li v-if="item.dataSource.develop">
                    发展机构：{{item.dataSource.develop}}
                  </li>
                  <li v-if="item.dataSource.UId">
                    唯一标识符：{{item.dataSource.UId}}
                  </li>
                </ul>
                </el-card>

              </li>
            </ul>
          
        </el-card>
        </ul>
      </div>
      <div v-if="summaryItem.method.resource.computeResources.length>0">
      <h4>(3) 计算资源</h4>
      <ul v-for="item in summaryItem.method.resource.computeResources">
        <el-card class="resourceCard">
              <ul style="list-style-type:none">
                <li>
                  <el-card class="card1">
                  <b>操作系统：</b>
                  <ul class="light-gray">
                    <li>
                      名称：{{item.system.name}}
                    </li>
                    <li>
                      版本：{{item.system.version}}
                    </li>
                  </ul>
                  <b>CPU：</b>
                  <ul class="light-gray">
                    <li>
                      名称：{{item.cpu.name}}
                    </li>
                    <li>
                      版本：{{item.cpu.version}}
                    </li>
                    <li>
                      描述：{{item.cpu.description}}
                    </li>
                  </ul>
                  <b>GPU：</b>
                  <ul class="light-gray">
                    <li>
                      名称：{{item.gpu.name}}
                    </li>
                    <li>
                      版本：{{item.gpu.version}}
                    </li>
                    <li>
                      描述：{{item.gpu.description}}
                    </li>
                  </ul>
                  <b>内存：</b>
                  <ul class="light-gray">
                    <li>
                      名称：{{item.ram.name}}
                    </li>
                    <li>
                      版本：{{item.ram.version}}
                    </li>
                    <li>
                      描述：{{item.ram.description}}
                    </li>
                  </ul>
                  <b>硬盘容量：</b>
                  <ul class="light-gray">
                    <li>
                      名称：{{item.hdd.name}}
                    </li>
                    <li>
                      版本：{{item.hdd.version}}
                    </li>
                    <li>
                      描述：{{item.hdd.description}}
                    </li>
                  </ul>
                  </el-card>
                </li>
                <li v-if="item.modelResources.length>0">
                <el-card class="card2">
                  <b>搭载模型资源：</b>
                  <ul class="light-gray">
                    <li v-for="sitem in item.modelResources">
                      {{sitem.modelBaseInfo.name}}
                    </li>
                  </ul>
                  </el-card>
                </li>
                <li v-if="item.dataResources.length>0">
                <el-card class="card3">
                  <b>搭载数据资源：</b>
                  <ul class="light-gray">
                    <li v-for="sitem in item.dataResources">
                      {{sitem.dataBaseInfo.name}}
                    </li>
                  </ul>
                </el-card>
                </li>
              </ul>
        </el-card>
      </ul>
      </div>
      <div v-if="summaryItem.method.processes.length>0">
      <h3>2.2 实验过程</h3>
      <el-timeline>
      <el-timeline-item v-for="(item, index) in summaryItem.method.processes" :key="index" center :timestamp="'步骤' + (index + 1)"
        placement="top">
        <div class="card">
        <process-card :stepInfo="item"></process-card>
        </div>
      </el-timeline-item>
      </el-timeline>
      </div>
      <h1>3 实验结果和结论</h1>
      <h3>3.1 结果验证</h3>
      <div>
      <ul class="light-gray">
        <li v-if="summaryItem.result.resultValidation.name">
          步骤名称：{{summaryItem.result.resultValidation.name}}
        </li>
        <li v-if="summaryItem.result.resultValidation.description">
          步骤描述：{{summaryItem.result.resultValidation.description}}
        </li>
        <li v-if="summaryItem.result.resultValidation.stepType">
          验证指标：{{summaryItem.result.resultValidation.stepType}}
        </li>
        <li v-if="summaryItem.result.resultValidation.dataResource.dataBaseInfo">
          输入数据：{{summaryItem.result.resultValidation.dataResource.dataBaseInfo.name}}
        </li>
        <li v-if="summaryItem.result.resultValidation.resultOutput.name">
          输出数据：
          <ul>
            <li v-if="summaryItem.result.resultValidation.resultOutput.name">
              名称：{{summaryItem.result.resultValidation.resultOutput.name}}
            </li>
            <li v-if="summaryItem.result.resultValidation.resultOutput.description">
              描述：{{summaryItem.result.resultValidation.resultOutput.description}}
            </li>
            <li v-if="summaryItem.result.resultValidation.resultOutput.time">
              生产时间：{{summaryItem.result.resultValidation.resultOutput.time}}
            </li>
            <li v-if="summaryItem.result.resultValidation.resultOutput.storage"> 
              存储位置：{{summaryItem.result.resultValidation.resultOutput.storage}}
            </li>
            <li v-if="summaryItem.result.resultValidation.resultOutput.format">
              数据格式：{{summaryItem.result.resultValidation.resultOutput.format}}
            </li>
          </ul>
        </li>
      </ul>
      <div v-if="summaryItem.result.resultValidation.pictures.length>0">
        <img style="margin-right:10px;width:150px;height:150px" v-for="item in summaryItem.result.resultValidation.pictures" :src="'http://172.21.213.216:8888/upload/getImg/'+item"/>
      </div>
      </div>
      <div style="display: flex;align-items:flex-end;">
        <div v-if="summaryItem.result.resultValidation.video && summaryItem.result.resultValidation.video.id!=''">已上传视频：<el-tag>{{summaryItem.result.resultValidation.video.name}}</el-tag></div>
      </div>
      <h3>3.2 结果可视化</h3>
      <div>
      <ul class="light-gray">
        <li v-if="summaryItem.result.resultVisualization.name">
          步骤名称：{{summaryItem.result.resultVisualization.name}}
        </li>
        <li v-if="summaryItem.result.resultVisualization.description">
          步骤描述：{{summaryItem.result.resultVisualization.description}}
        </li>
        <li v-if="summaryItem.result.resultVisualization.stepType">
          步骤类型：{{summaryItem.result.resultVisualization.stepType}}
        </li>
        <div v-if="summaryItem.result.resultVisualization.stepType==='可视化软件'">
          <li v-if="summaryItem.result.resultVisualization.softName">
            软件需求：{{summaryItem.result.resultVisualization.softName}}
          </li>
          <li v-if="summaryItem.result.resultVisualization.softVersion">
            软件版本：{{summaryItem.result.resultVisualization.softVersion}}
          </li>
          <li v-if="summaryItem.result.resultVisualization.softStorage">
            存储位置：{{summaryItem.result.resultVisualization.softStorage}}
          </li>
          <li v-if="summaryItem.result.resultVisualization.softDepend">
            软件依赖：{{summaryItem.result.resultVisualization.softDepend}}
          </li>
        </div>
        <div v-if="summaryItem.result.resultVisualization.stepType==='可视化方法'">
          <li v-if="summaryItem.result.resultVisualization.codeContent">
            代码内容：{{summaryItem.result.resultVisualization.codeContent}}
          </li>
          <li v-if="summaryItem.result.resultVisualization.codeLanguage">
            编程语言：{{summaryItem.result.resultVisualization.codeLanguage}}
          </li>
          <li v-if="summaryItem.result.resultVisualization.codeDepend">
            模型依赖库：{{summaryItem.result.resultVisualization.codeDepend}}
          </li>
        </div>
        <li v-if="summaryItem.result.resultVisualization.dataResource.dataBaseInfo">
          输入数据：{{summaryItem.result.resultVisualization.dataResource.dataBaseInfo.name}}
        </li>
        <li v-if="summaryItem.result.resultVisualization.resultOutput.name">
          输出数据：
          <ul>
            <li v-if="summaryItem.result.resultVisualization.resultOutput.name">
              名称：{{summaryItem.result.resultVisualization.resultOutput.name}}
            </li>
            <li v-if="summaryItem.result.resultVisualization.resultOutput.description">
              描述：{{summaryItem.result.resultVisualization.resultOutput.description}}
            </li>
            <li v-if="summaryItem.result.resultVisualization.resultOutput.time">
              生产时间：{{summaryItem.result.resultVisualization.resultOutput.time}}
            </li>
            <li v-if="summaryItem.result.resultVisualization.resultOutput.storage">
              存储位置：{{summaryItem.result.resultVisualization.resultOutput.storage}}
            </li>
            <li v-if="summaryItem.result.resultVisualization.resultOutput.format">
              数据格式：{{summaryItem.result.resultVisualization.resultOutput.format}}
            </li>
          </ul>
        </li>
      </ul>
      <div v-if="summaryItem.result.resultVisualization.pictures.length>0">
        <img style="margin-right:10px;width:150px;height:150px" v-for="item in summaryItem.result.resultVisualization.pictures" :src="'http://172.21.213.216:8888/upload/getImg/'+item"/>
      </div>
      </div>
      <div style="display: flex;align-items:flex-end;">
        <div v-if="summaryItem.result.resultVisualization.video && summaryItem.result.resultVisualization.video.id!=''">已上传视频：<el-tag>{{summaryItem.result.resultVisualization.video.name}}</el-tag></div>
      </div>
      <h3>3.3 结果分析</h3>
      <h4>(1) 结果分析及结论</h4>
      <p class="light-gray">{{summaryItem.result.conclusion.text}}</p>
      <div v-if="summaryItem.result.conclusion.paper!=''">
      <h4>(2) 相关文献</h4>
      <p class="light-gray">{{summaryItem.result.conclusion.paper}}</p>
      </div>
      <div v-if="summaryItem.result.conclusion.pictures.length>0">
      <img style="margin-right:10px;width:150px;height:150px" v-for="sitem in summaryItem.result.conclusion.pictures" :src="'http://172.21.213.216:8888/upload/getImg/'+sitem"/>
      </div>
      <div style="display: flex;align-items:flex-end;">
        <div v-if="summaryItem.result.conclusion.video && summaryItem.result.conclusion.video.id!=''">已上传视频：<el-tag>{{summaryItem.result.conclusion.video.name}}</el-tag></div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ProcessCard from "./ProcessCard.vue";
export default defineComponent({
  props:{
    summaryItem:{
      type:Object
    }
  },
  components: { ProcessCard },
  setup(props) {
    const summaryItem = (props.summaryItem as any)
    onMounted(() => {

    })
    return{
      summaryItem
    }
  }
});
</script>

<style lang="scss" scoped>
.summaryTab {
  // width: 500px;
  }
  h4{
    text-indent: 2em;
  }
  p{
    text-indent: 2em;
  }
  .light-gray{
    color: rgb(90, 90, 90);
  }
  .resourceCard{
    flex-shrink: 0;
    width: 900px;
    margin: 10px;
    border-radius: 6px;
    padding: 20px;
    .card1{
      flex-shrink: 0;
          width: 750px;
          margin: 10px;
          background: #e5f0ff;
          border-radius: 6px;
          padding: 10px;
    }
        .card2{
      flex-shrink: 0;
          width: 750px;
          margin: 10px;
          background: #fff7e8;
          border-radius: 6px;
          padding: 10px;
    }
        .card3{
      flex-shrink: 0;
          width: 750px;
          margin: 10px;
          background: #e4ffec;
          border-radius: 6px;
          padding: 10px;
    }
  }
</style>