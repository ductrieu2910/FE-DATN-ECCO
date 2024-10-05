import React, { useEffect } from "react";
import { Carousel } from "flowbite-react";
import slide_1 from "../resources/slide-ecco1.webp";
import slide_2 from "../resources/slide-ecco2.webp";
import slide_3 from "../resources/slide-ecco3.webp";
import slide_4 from "../resources/slide-ecco4.webp";
import slide_5 from "../resources/slide-ecco5.webp";
import ProductList from "../components/ProductList";
import ProductListSale from "../components/ProductListSale";
import { useDispatch, useSelector } from "react-redux";
import { getProductHome } from "../redux/product/product.thunk";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { productHome } = useSelector((state) => state.product);

const selectedCategories = ["hang-moi-nam", "hang-moi-nu"]; 
const selectedCategoriesSale = ["mid-of-season-sale"]; 

  useEffect(() => {
    if (categories.length > 0) {
      const slugs = categories.map((item) => item.slug);
      dispatch(getProductHome(slugs.join(",")));
    }
  }, [dispatch, categories]);

  return (
    <>
      <div className=" " style={{height:"38rem"}}>
        <Carousel slideInterval={5000}>
        <img src={slide_1} alt="..." />
        <div>
        <img src={slide_2} alt="..." />
			  <div id="caption_2" class="container-header caption-slider left">
				  <div class="box-caption">
					  <h4 style={{color:"#ffffff"}}>New</h4>
					  <h3 style={{color:"#ffffff"}}>ECCO BIOM 2.2</h3>
					  <p class="caption-info" style={{color:"#ffffff"}}>Giày thể thao với cải tiến siêu nhẹ, siêu thoải mái</p>
					  <div class="caption-btn-wrap  left">
						  <a class="btn-index-slider " data-id="2-1-o" href=""><span class="bg"></span><span class="txt">GIÀY NỮ</span></a>
						  <a class="btn-index-slider " data-id="2-2-o" href=""><span class="bg"></span><span class="txt">GIÀY NAM</span></a>	
					  </div>
				  </div>
			  </div>	
        </div>
        <div>
        <img src={slide_3} alt="..." />
          <div id="caption_3" class="container-header caption-slider center">
				<div class="box-caption">
					<h4 style={{color: "#000000"}}>New</h4>
					<h3 style={{color: "#000000"}}>ECCO STREET 720</h3>
					<p class="caption-info" style={{color: "#000000"}}></p>
					<div class="caption-btn-wrap  center">
						<a class="btn-index-slider " data-id="3-1-o" href=""><span class="bg"></span><span class="txt">GIÀY NAM</span></a>
						<a class="btn-index-slider " data-id="3-2-o" href=""><span class="bg"></span><span class="txt">GIÀY NỮ</span></a>
					</div>
				</div>
			</div>
      </div>
      <div>
          <img src={slide_4} alt="..." />
          <div id="caption_4" class="container-header caption-slider right">
				<div class="box-caption">
					<h4 style={{color: "#ffffff"}}>New</h4>
					<h3 style={{color: "#ffffff"}}>ECCO SCULPTED SANDAL</h3>
					<p class="caption-info" style={{color: "#ffffff"}}>Bộ sưu tập giày &amp; dép đa dạng cho mọi phong cách.  </p>
					<div class="caption-btn-wrap  right">	
						<a class="btn-index-slider " data-id="4-1-o" href=""><span class="bg"></span><span class="txt">MUA NGAY</span></a>
					</div>
				</div>
			</div>
      </div>
      <div>
          <img src={slide_5} alt="..." />
          <div id="caption_5" class="container-header caption-slider center">
				<div class="box-caption">
					<h4  style={{color: "#ffffff"}}></h4>
					<h3  style={{color: "#ffffff"}}>ECCO GOLF LT1</h3>
					<p class="caption-info"  style={{color: "#ffffff"}}>Phong cách làm thay đổi cuộc chơi.</p>
					<div class="caption-btn-wrap center ">
						<a class="btn-index-slider1 " data-id="5-1-o" href=""><span class="bg"></span><span class="txt">MUA NGAY</span></a>
						<a class="btn-index-slider1 bg-transparent" data-id="5-2-o" href=""><span class="bg"></span><span class="txt">TÌM HIỂU THÊM</span></a>
					</div>
				</div>
			</div>
      </div>
        </Carousel>
      </div>
      {/* <div className="py-4">
        <div className="text-3xl text-center font-bold">Enjoy Your Youth!</div>
        <div className="text-center px-4 w-full flex items-center justify-center">
          <div className="sm:w-full md:w-1/2 py-2">
            Không chỉ là thời trang, TEELAB còn là "phòng thí nghiệm" của tuổi
            trẻ - nơi nghiên cứu và cho ra đời nguồn năng lượng mang tên
            "Youth". Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng
            động và trẻ trung.
          </div>
        </div>
      </div> */}
      {productHome.length > 0 &&
        productHome
        .filter((item) => selectedCategories.includes(item.category.slug))
        .map((item, index) => {
          if (item.products.length > 0) {
            return (
              <React.Fragment key={item.category._id || index}>
                <ProductList
                  title={item.category.name}
                  products={item?.products}
                  isPagination={false}
                />
                <div
                  onClick={() => navigate(`/category/${item.category.slug}`)}
                  className="flex items-center justify-center pb-8"
                >
                  <div className="w-40 bg-slate-900 py-4 px-2 text-slate-50 font-medium text-center rounded-lg cursor-pointer">
                    Xem thêm
                  </div>
                </div>
              </React.Fragment>
            );
          }
          return null;
        })}

<div class="container-golf">
		<h3 class="news-index-cs-title">
			ECCO GOLF
		</h3>	
		<div class="news-index-cs-items-wrap">
			<div class="swiper mySwiper-news swiper-backface-hidden swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
				<div class="swiper-wrapper" id="swiper-wrapper-d9991351c1271432" aria-live="polite" style={{transform: "translate3d(0px, 0px, 0px)"}}>
					<div class="swiper-slide swiper-slide-active" role="group" aria-label="1 / 3" style={{width: "406.667px", marginRight: "20px"}}>
						<div class="news-index-cs-item">
							<a href="">
								<img class="img-responsive lazyloaded" src="https://file.hstatic.net/1000143422/file/ec_banner_insider_1200x1200px_1.png" data-src="https://file.hstatic.net/1000143422/file/ec_banner_insider_1200x1200px_1.png" alt=""></img>
							</a>
							<div class="journal-slider-item-content">
								<h3 class="slider-title">ECCO GOLF LT1</h3>
								<a class="text-is-underline" href="">
									MUA NGAY
								</a>
							</div>
						</div>
					</div>
					<div class="swiper-slide swiper-slide-next" role="group" aria-label="2 / 3" style={{width: "406.667px", marginRight: "20px"}}>
						<div class="news-index-cs-item">
							<a href="">
								<img class="img-responsive lazyloaded" src="https://file.hstatic.net/1000143422/file/ec_banner_insider_1200x1200px_2.png" data-src="https://file.hstatic.net/1000143422/file/ec_banner_insider_1200x1200px_2.png" alt=""></img>
							</a>
							<div class="journal-slider-item-content">
								<h3 class="slider-title">ECCO GOLF BIOM® C4</h3>
								<a class="text-is-underline" href="">
									MUA NGAY
								</a>
							</div>
						</div>
					</div>
					<div class="swiper-slide" role="group" aria-label="3 / 3" style={{width: "406.667px", marginRight: "20px"}}>
						<div class="news-index-cs-item">
							<a href="">
								<img class="img-responsive lazyloaded" src="https://file.hstatic.net/1000143422/file/ec_banner_insider_1200x1200px_3.png" data-src="https://file.hstatic.net/1000143422/file/ec_banner_insider_1200x1200px_3.png" alt=""></img>
							</a>
							<div class="journal-slider-item-content">
								<h3 class="slider-title">ECCO GOLF BIOM® G5</h3>
								<a class="text-is-underline" href="">
									MUA NGAY
								</a>
							</div>
						</div>
					</div>
				</div>
			<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
			<div class="swiper-nav">
				<div class="swiper-news-button-next swiper-button-disabled" tabindex="-1" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-d9991351c1271432" aria-disabled="true"></div>
				<div class="swiper-news-button-prev swiper-button-disabled" tabindex="-1" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-d9991351c1271432" aria-disabled="true"></div>
			</div>
			<div class="swiper-pagination swiper-pagination-bullets"><span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span></div>
		</div>
	</div>
        {productHome.length > 0 &&
        productHome
        .filter((item) => selectedCategoriesSale.includes(item.category.slug))
        .map((item, index) => {
          if (item.products.length > 0) {
            return (
              <React.Fragment key={item.category._id || index}>
                
                <ProductListSale
                  title={item.category.name}
                  products={item?.products}
                  isPagination={false}
                  
                />
                 
                <div
                  onClick={() => navigate(`/category/${item.category.slug}`)}
                  className="flex items-center justify-center pb-8"
                >
                  <div className="w-40 bg-slate-900 py-4 px-2 text-slate-50 font-medium text-center rounded-lg cursor-pointer">
                    Xem thêm
                  </div>
                </div>
              </React.Fragment>
            );
          }
          return null;
        })}
    </>
  );
};

export default HomePage;
