<template>
  <div class="card">
    <el-card>
      <h3>聚类分析及结果处理</h3>
      
      <div class="des">
        本文使用 sklearn 机器学习库中的 K-means
        函数对标准化处理后的数据进行聚类分析，然后对聚类结果进行处理，得到中国夏季降水量日变化的空间分布模式图，进行空间分布特征的挖掘分析。
        基于 K-means
        算法对标准化后的降水日变化数据进行聚类，将具有相似降水日变化形态特征的栅格单元聚成一类。读取所有栅格单元标准化后的24小时日变化时间序列数据，利用K-means算法进行聚类分析；设置不同的K值（聚类数，2-40）进行聚类处理，对于聚类结果，使用“肘”方法（Elbow
        method）确定K 值的最优解，“肘”方法的核心指标是 SSE（Sum of the Squared
        Errors，误差平方和），即所有样本的聚类误差（累计每个簇中样本到质心距离的平方和），随着
        K 的增大，每个簇的聚合度会增强，SSE下降幅度会增大，随着K值继续增大，SSE
        的下降幅度会减少并趋于平缓，SSE和K值的关系图会呈现出一个手肘的形状，此时肘部对应的K值就是最佳的聚类数
      </div>
      <div class="process-item">
        <strong>步骤类型：</strong
        ><el-tag type="success" size="large">模拟分析</el-tag>
      </div>
      <div class="process-item">
        <strong>参考文献：</strong>
        中央气象局.地面气象观测规范[M].气象出版社, 2003.】
      </div>
      <div class="process-item">
        <strong>其他补充：</strong>
        好的声卡的菊花开了酒啊后的卡上你的空间
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.des {
  line-height: 25px;
  margin-bottom: 10px;
}
.process-item {
  margin-bottom: 10px;
}
</style>