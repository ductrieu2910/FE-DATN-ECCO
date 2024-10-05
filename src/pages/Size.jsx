import { Breadcrumb } from "flowbite-react";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import size from "../resources/size.png";
import size1 from "../resources/size1.webp";
import size2 from "../resources/size2.webp";
import size3 from "../resources/size3.webp";
import size4 from "../resources/size4.webp";

const Size = () => {
  return (
    <div className="px-8 py-4">
      <div className="py-6 md:px-16 xl:px-16 2xl:px-16">
        <Breadcrumb>
          <Breadcrumb.Item>
            <div className="text-slate-600 text-base cursor-pointer">
              <HomeOutlined /> Trang Chủ
            </div>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <div className="text-slate-800 text-base cursor-pointer">
              Bảng size
            </div>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* <img className="w-full" src={size} alt="size-image" /> */}
      <div className="container">
	<div className="row">
		<div className="col-md-12" id="layout-page" style={{margintop: "15px"}}>
			<span className="header-page clearfix">
				<h1>SIZE SẢN PHẨM</h1>
			</span>
			<div className="content-page">
				<p>&nbsp;</p><table cellpadding={0} cellPadding={0} border={1} style={{bordercollapse: "collapse", width: "100%"}}><tbody><tr><td colspan={3} style={{textAlign: "center"}}><h2><strong>Size giày nữ</strong></h2></td></tr><tr><th style={{width: "215px",textAlign:"center"}}>US</th><th style={{width: "234px",textAlign: "center"}}>EU</th><th style={{width: "215px",textAlign: "center"}}>CM</th></tr><tr><td style={{width: "215px", textAlign: "center"}}>4/4.5</td><td style={{width: "234px", textAlign: "center"}}>35</td><td style={{textAlign: "center"}}>21.8</td></tr><tr><td style={{width: "215px", textAlign: "center"}}>5/5.5</td><td style={{width: "234px", textAlign: "center"}}>36</td><td style={{textAlign: "center"}}>23</td></tr><tr><td style={{width: "215px", textAlign: "center"}}>6/6.5</td><td style={{width: "234px", textAlign: "center"}}>37</td><td style={{textAlign: "center"}}>23.7</td></tr><tr><td style={{width: "215px", textAlign: "center"}}>7/7.5</td><td style={{width: "234px", textAlign: "center"}}>38</td><td style={{textAlign: "center"}}>24.3</td></tr><tr><td style={{width: "215px", textAlign: "center"}}>8/8.5</td><td style={{width: "234px", textAlign: "center"}}>39</td><td style={{textAlign: "center"}}>25</td></tr><tr><td style={{width: "215px", textAlign: "center"}}>9/9.5</td><td style={{width: "234px", textAlign: "center"}}>40</td><td style={{textAlign: "center"}}>25.7</td></tr></tbody></table><p style={{textAlign: "center"}}>&nbsp;</p><table cellpadding="0" cellspacing="0" border="1" style={{bordercollapse: "collapse", width: "100%"}}><tbody><tr><td colspan="3"><h2 style={{textAlign: "center"}}><strong>Size giày nam</strong></h2></td></tr><tr><th style={{width: "218px",textAlign: "center"}}>US</th><th style={{width: "233px", textAlign: "center"}}>EU</th><th style={{width: "215px", textAlign: "center"}}>CM</th></tr><tr><td style={{width: "218px",textAlign: "center"}}>5/5.5</td><td style={{width: "233px", textAlign: "center"}}>39</td><td style={{textAlign: "center"}}>25</td></tr><tr><td style={{width: "218px",textAlign: "center"}}>6/6.5</td><td style={{width: "233px", textAlign: "center"}}>40</td><td style={{textAlign: "center"}}>25.7</td></tr><tr><td style={{width: "218px",textAlign: "center"}}>7/7.5</td><td style={{width: "233px", textAlign: "center"}}>41</td><td style={{textAlign: "center"}}>26.3</td></tr><tr><td style={{width: "218px",textAlign: "center"}}>8/8.5</td><td style={{width: "233px", textAlign: "center"}}>42</td><td style={{textAlign: "center"}}>27</td></tr><tr><td style={{width: "218px",textAlign: "center"}}>9/9.5</td><td style={{width: "233px", textAlign: "center"}}>43</td><td style={{textAlign: "center"}}>27.7</td></tr><tr><td style={{width: "218px",textAlign: "center"}}>10/10.5</td><td style={{width: "233px", textAlign: "center"}}>44</td><td style={{textAlign: "center"}}>28.3</td></tr></tbody></table><p>&nbsp;</p><p>&nbsp;</p>
			</div>
		</div>
	</div>
  <div class="container-fluid sectionsize">
			<div class="rowsize">
				<div class=" col-sm-3 ">
					<img src={size1} class="img-fluid"></img>	
					<div class=" text-center container">
						<p>
							Chuẩn bị 1 tờ giấy , 1 cây bút và 1 cây thước
						</p>
					</div>
				</div>
				<div class=" col-sm-3 ">
					<img src={size2} class="img-fluid"></img>	
					<div class=" text-center container">
						<p>
							Đặt tờ giấy trên sàn dựa vào tường và đặt bàn trên giấy với phần sau của gót chân chạm vào tường.
						</p>
					</div>
				</div>
				<div class="col-sm-3  ">
					<img src={size3} class="img-fluid"></img>
					<div class=" text-center container">
						<p>
							Vẽ một đường phía trước ngón chân dài nhất của bạn. Lặp lại cho bàn chân còn lại.
						</p>
					</div>
				</div>
				<div class=" col-sm-3 ">
					<img src={size4} class="img-fluid"></img>	
					<div class=" text-center container">
						<p>
							Đo chiều dài từ điểm đánh dấu đến mép giấy . Đây là kích thước xác định size giày.
						</p>
					</div>
				</div>

			</div>
		</div>
</div>
    </div>
  );
};

export default Size;
