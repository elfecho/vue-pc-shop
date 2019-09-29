<template>
	<div class="flow">
		<div class="title">结算页</div>
		<div class="checkout-warp">
			<div class="ck-step">
				<div class="ck-step-tit clearfix">
					<h3>收货人信息</h3>
					<a href="" class="extra-r" target="_blank">管理收货人地址</a>
				</div>
				<div class="ck-step-cont">
					<div class="consignee-warp clearfix">
						<div
							:class="['cs-w-item', item.ischeckbox ? 'cs-selected':'']"
							v-for="(item, index) in addrList"
							:key="'order'+item.id"
							@click="handleplan(item)"
						>
							<div class="item-tit">
								<h3 class="username">{{item.username}}</h3>
								<span class="remark"></span>
							</div>
							<div class="item-tel">
								<span class="contact">{{item.phone}}</span>
							</div>
							<div class="item-address">{{item.address}}</div>
							<i :class="['icon', item.ischeckbox ? 'active':'']"></i>
						</div>
						<div class="cs-w-item">
							<a href="javascript:void(0);" class="add-new-address">
								<i class="iconfonts icon-add-quer"></i>
								<span>添加新地址</span>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="ck-step">
				<div class="ck-step-tit">
					<h3>支付方式</h3>
				</div>
				<div class="ck-step-cont">
					<div class="payment-warp">
						<div class="payment-list box">
							<div class="p-radio-item payment-item item-selected">
								<span>在线支付</span>
								<b></b>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="ck-step">
				<div class="ck-step-tit clearfix">
					<h3>商品信息</h3>
					<a href="" class="extra-r" target="_blank">返回购物车</a>
				</div>
				<div class="ck-step-cont">
					<div class="ck-goods-warp" id="goods_inventory">
						<div class="ck-goods-list">
							<div class="ck-goods-item" ectype="shoppingList">
								<div class="ck-goods-tit">
									<div class="ck-store">
										<a href="javascript:;" class="shop-name">自营</a>
										<a
											href="javascript:;"
											id="IM"
											onclick="openWin(this)"
											ru_id="0"
											class="p-kefu p-c-violet"
											target="_blank"
										>
											<i class="iconfont icon-kefu"></i>
										</a>
									</div>
									<div class="ck-dis-modes">
										<div class="ck-dis-tit">配送方式：</div>
										<div class="ck-dis-info" ectype="disInfo">
											<ul class="ck-sp-type">
												<li
													class="mode-tab-item mode-tab-log shopping-list-checked item-selected"
													ectype="tabLog"
													data-ruid="0"
													data-type="0"
													data-shipping="16"
													data-shippingcode="sf_express"
												>
													<span>顺丰速运</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div class="ck-goods-cont">
									<div class="cg-item box" v-for="item of orderLists">
										<div class="cg-name c-col">
											<a href="" target="_blank">
												<div class="p-img">
													<img
														:src="item.goods.img"
														width="48"
														height="48"
													>
												</div>
												<div class="p-info">
													<div class="p-name">{{item.goods.name}}</div>
													<div class="p-attr">{{item.goods.spec}}</div>
												</div>
											</a>
										</div>
										<div class="cg-price c-col">
											<span class="fr cl">
												<em>¥</em>{{item.goods.unitPrice}}
											</span>
										</div>
										<div class="cg-number c-col">x{{item.goodsNum}}</div>
										<div class="cg-state c-col">
											<span>有货</span>
										</div>
										<div class="cg-sum c-col">
											<em>¥</em>{{item.goods.unitPrice * item.goodsNum}}
										</div>
										<div class="cg-item-line c-col"></div>
										<i class="dian"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="ck-order-remark">
						<input
							name="postscript"
							type="text"
							id="remarkText"
							maxlength="45"
							size="15"
							class="text"
							placeholder="订单备注 限60个字"
							autocomplete="off"
              v-model="remarks"
						>
						<span class="prompt">提示：请勿填写有关支付、收货、发票方面的信息</span>
					</div>
				</div>
			</div>
		</div>
		<div class="ECS_ORDERTOTAL">
			<div class="order-summary">
				<div class="statistic">
					<div class="list">
						<span>
							<em>2</em>件商品，总商品金额：
						</span>
						<em class="price" id="warePriceId">
							<em>¥</em>{{shopTotal}}
						</em>
					</div>
					<div class="list">
						<span>配送费用：</span>
						<em class="price" id="freightPriceId">
							<!-- +
							<em>¥</em>5.00 -->
              免配送费
						</em>
					</div>
					<div class="list">
						<span>应付总额：</span>
						<em class="price-total">
							<em>¥</em>{{shopTotal}}
						</em>
					</div>
				</div>
			</div>
			<div class="checkout-foot" ectype="tfoot-toolbar">
				<div class="w">
					<div class="btn-area">
						<input type="button" id="submit-done" class="submit-btn" @click="handleSubmit" value="提交订单">
					</div>
					<div class="d-address">
						<span id="sendAddr">寄送至：广东广州白云区嘉禾街道望岗高桥街4号盈通综合批发市场</span>
						<span id="sendMobile">收货人：1&nbsp;&nbsp;13800138000</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getAddrDate, addOrder } from "../../api/client";
export default {
  component: {},
  computed: {
    ...mapState(["clientToken", "orderLists"]),
    shopTotal() {
      let total = 0
      this.orderLists.map((item) => {
        total+=item.goods.unitPrice * item.goodsNum
      })
      return total
    }
  },
  data() {
    return {
      addrList: [],
      remarks: '',
      addrId: ''
    };
  },
  mounted() {
    this.getAddrDate();
    console.log(this.orderLists)
  },
  methods: {
    getAddrDate() {
      const res = getAddrDate(this.clientToken);
      res
        .then(data => {
          this.addrList = data;
          this.$set(this.addrList[0], "ischeckbox", true);
          this.addrId = this.addrList[0].id
          // console.log(data);
        })
        .catch(e => {
          alert(e);
        });
    },
    handleplan(item) {
      const _this = this;
      this.$nextTick(function() {
        _this.addrList.forEach(function(item) {
          _this.$set(item, "ischeckbox", false);
        });
        _this.$set(item, "ischeckbox", true);
      });
      this.$set(item, "ischeckbox", true);
      this.addrId = item.id
    },
    handleSubmit(){
      let goodsList = this.orderLists.map(item => {
        return {
          goodsDetailId: item.goods.goodsDetailId,
          goodsNum: item.goodsNum,
          amount: item.amount
        }
      })
      const zdy = {
        token:this.clientToken,
        addrId: this.addrId,
        goodsList: goodsList,
        remarks: this.remarks,
        state:0
      }
      console.log(zdy)
      const res = addOrder(zdy)
      res.then(data => {
        console.log('data:::', data)
      })



    }
  }
};
</script>
<style lang="less">
.title {
  font-size: 18px;
  color: #8c8c8c;
  margin-top: 36px;
}
.checkout-warp {
  margin-top: 30px;
  .ck-step-tit {
    padding: 20px 0 10px;
    height: 60px;
    line-height: 20px;
    border-bottom: 1px solid #d2d2d2;
    display: block;
    h3 {
      font-size: 18px;
      color: #555;
      float: left;
    }
    .extra-r {
      float: right;
      color: #438cde;
    }
  }
  .ck-step-cont {
    margin-top: 20px;
    padding-bottom: 30px;
    display: block;
    position: relative;
  }
}
// 收货地址
.consignee-warp {
  position: relative;
  .cs-w-item {
    float: left;
    width: 280px;
    height: 140px;
    padding: 20px 18px 18px 22px;
    border: 1px dashed #d2d2d2;
    margin: 10px 18px 0 0;
    color: #8c8c8c;
    position: relative;
    font-size: 14px;
    cursor: pointer;
    &.cs-selected {
      border-color: #f42424;
    }
    .icon {
      width: 20px;
      height: 20px;
      display: block;
      position: absolute;
      right: -1px;
      bottom: -1px;
			background-position: 0 -50px;
			display: none;
			&.active{
				display: block;
			}
    }
    .add-new-address {
      font-size: 14px;
      margin: 0;
      text-decoration: none;
      display: block;
      text-align: center;
      color: #8c8c8c;
      padding: 30px 0;
      .iconfont {
        font-size: 32px;
        height: 32px;
        width: 32px;
        line-height: 32px;
        color: #d2d2d2;
      }
      span {
        display: block;
      }
    }
  }
}
// 支付方式
.payment-list {
  .p-radio-item {
    width: auto;
    height: 38px;
    line-height: 38px;
    border: 1px solid #d2d2d2;
    margin-right: 20px;
    padding: 0 25px;
    cursor: pointer;
    font-size: 14px;
    position: relative;
    &.item-selected {
      border-color: #f42424;
      b {
        position: absolute;
        background: url(~img/dsc-icon.png) 0 -50px no-repeat;
        right: 0;
        bottom: 0;
        width: 20px;
        height: 20px;
      }
    }
  }
}
// 商品详情
.ck-goods-warp {
  padding: 0;
  margin: 0;
  .ck-goods-item {
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
    .ck-goods-tit {
      height: 45px;
      padding: 5px 0;
      .ck-store {
        float: left;
        line-height: 30px;
        .shop-name {
          font-size: 14px;
          font-weight: bold;
          .p-kefu {
            color: #fcc217;
            margin-left: 5px;
          }
        }
      }
      .ck-dis-modes {
        float: right;
        font-size: 14px;
        line-height: 30px;
        position: relative;
        .ck-dis-tit {
          float: left;
          color: #8c8c8c;
          line-height: 30px;
        }
        .ck-dis-info {
          float: left;
          height: 30px;
          position: relative;
          ul {
            float: left;
            li {
              float: left;
              height: 28px;
              line-height: 28px;
              border: 1px solid #d2d2d2;
              font-size: 14px;
              padding: 0 15px;
              min-width: 68px;
              text-align: center;
              margin-right: 10px;
              cursor: pointer;
              &.item-selected {
                border-color: #f42424;
                color: #f42424;
              }
              &:last-child {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
  }
  .ck-goods-cont {
    width: 100%;
    overflow: hidden;
    padding: 10px 0;
    background-color: #f8f8f8;
    .cg-item {
      position: relative;
      padding: 20px 30px;
      width: 100%;
      flex-flow: row nowrap;
      border-bottom: 1px dashed #d2d2d2;
      .cg-name {
        margin-right: 20px;
        text-align: left;
        flex: 1;
        .p-img {
          width: 48px;
          height: 48px;
          float: left;
          border: 1px solid #d2d2d2;
        }
        .p-info {
          float: left;
          margin-left: 15px;
          width: calc(100% - 65px);
          .p-name {
            line-height: 25px;
            height: 25px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333;
            font-size: 12px;
          }
          .p-attr {
            line-height: 20px;
            color: #8c8c8c;
            font-size: 12px;
            margin-top: 5px;
          }
        }
      }
      .cg-price {
        width: 120px;
      }
      .fr {
        float: right !important;
      }
      .cg-number {
        text-align: center;
        width: 55px;
      }
      .cg-state {
        width: 50px;
        font-size: 14px;
        line-height: 24px;
        text-align: right;
      }
      .cg-sum {
        width: 120px;
        font-weight: bold;
        color: #f42424;
        margin-right: 0;
        text-align: right;
      }
      .c-col {
        // float: left;
        color: #333;
        font-size: 16px;
      }
    }
  }
}
.ck-order-remark {
  margin-top: 45px;
  overflow: hidden;
  .text {
    float: left;
    height: 38px;
    line-height: 38px;
    padding: 0 12px;
    border-color: #d2d2d2;
    font-size: 14px;
    width: 830px;
  }
  .prompt {
    line-height: 40px;
    color: #8c8c8c;
    margin-left: 18px;
  }
}
// 订单额
.order-summary {
  overflow: hidden;
  padding: 20px 30px 60px;
  background-color: #fff;
  border-top: 1px dashed #d2d2d2;
  .statistic {
    width: 340px;
    float: right;
    .list {
      line-height: 24px;
      overflow: hidden;
      margin-bottom: 5px;
      zoom: 1;
      span {
        width: 200px;
        margin-right: 10px;
        float: left;
        text-align: right;
        font-size: 14px;
        color: #8c8c8c;
      }
      .price {
        color: #333;
        float: left;
        width: 130px;
        text-align: right;
        font-size: 14px;
      }
      .price-total {
        width: 130px;
        font-size: 20px;
        font-weight: bold;
        color: #f42424;
        float: left;
        text-align: right;
      }
    }
  }
}
.checkout-foot {
  display: block;
  height: 50px;
  line-height: 50px;
  color: #8c8c8c;
  background: #fff;
  overflow: hidden;
  margin: 10px 0 0;
  .w {
    width: 100%;
  }
  .d-address {
    float: right;
    span {
      margin-right: 20px;
    }
  }
  .btn-area {
    float: right;
    .submit-btn {
      width: 160px;
      height: 50px;
      border: 0;
      background-color: #f42424;
      color: #fff;
      line-height: 50px;
      font-size: 24px;
      text-align: center;
      cursor: pointer;
      float: left;
    }
  }
}
</style>
