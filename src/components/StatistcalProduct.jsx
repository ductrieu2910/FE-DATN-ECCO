import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { Spin } from "antd";

const StatisticalProduct = ({ unsoldOldProducts, isLoading }) => {
  const { series, categories } = useMemo(() => {
    if (!Array.isArray(unsoldOldProducts) || unsoldOldProducts.length === 0) {
      return { series: [{ data: [] }], categories: [] };
    }

    // Map the unsold products to extract their names and creation dates
    const sortedProducts = [...unsoldOldProducts].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt) // Sort by creation date, oldest first
    );
    
    const data = sortedProducts.map(() => 0); // Set all values to 0 because they are unsold
    const categories = sortedProducts.map((product) => product.name);

    return { series: [{ data }], categories };
  }, [unsoldOldProducts]);

  const options = {
    chart: {
      type: "bar",
      height: 380,
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7",
    ],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#000"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ": không bán được";
      },
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#000"],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
        formatter: function () {
          return "Không bán được";
        },
      },
    },
  };
  
  console.log(unsoldOldProducts)
  if (isLoading) {
    return (
      <div className="py-4 flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!Array.isArray(unsoldOldProducts) || unsoldOldProducts.length === 0) {
    return <div>Không có sản phẩm nào không bán được.</div>;
  }
  
  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={380}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default StatisticalProduct;
