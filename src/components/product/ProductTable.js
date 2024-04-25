import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import ProductDrawer from "components/drawer/ProductDrawer";
// import ProductDrawer from "components/drawer/ProductDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import CurrencyServices from "services/CurrencyServices";
import ProductServices from "services/ProductServices";
import requests from "services/httpService";
import { showingTranslateValue } from "utils/translate";

//internal import

const ProductTable = ({ products, isCheck, setIsCheck, currency, lang, globalSetting }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  // const { data, loading } = useAsync(ProductServices.getAllProducts);
  // const { data, loading } = useAsync(CurrencyServices.getShowingCurrency);

  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log("id", id, checked);

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       console.log("products customers detials...");
  //       const response = await requests.get('/api/products');
  //       console.log("products fetched successfully:", response);
  //       setCategories(response);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);
  return (
    <>

      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        // added by : Govinda 25/3/2024
        <MainDrawer>
          <ProductDrawer currency={currency} id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {products?.map((product, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={product?.title?.en}
                // name={product?.title?.[lang]}
                id={product._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(product._id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                {product?.image ? (
                  <Avatar
                    className="hidden p-1 mr-2 md:block bg-gray-50 shadow-none"
                    src={product?.image}
                    alt="product"
                  />
                ) : (
                  <Avatar
                    src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                    alt="product"
                  />
                )}
                <div>
                  <h2 className="text-sm font-medium">
                    {showingTranslateValue(product?.title, lang)?.substring(
                      0,
                      28
                    )}
                    {/* {product.title[lang].substring(
                      0,
                      15
                    )}... */}
                  </h2>
                  <h2 className="text-sm font-medium">
                    {product.title[lang] && typeof product.title[lang] === 'string' ?
                      product.title[lang].substring(0, 15) + '...' :
                      ''
                    }
                  </h2>

                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {showingTranslateValue(product?.category.name.en, lang)} */}
                {product?.parent}
                {product?.category}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {/* new schema changes over here added by Govinda */}
                {/* {Number(product?.prices.originalPrice).toFixed(2)} */}
                {Number(product?.originalPrice).toFixed(2)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {/* new schema changes over here added by Govinda */}
                {/* {Number(product?.prices.price).toFixed(2)} */}
                {Number(product?.originalPrice).toFixed(2)}
              </span>
            </TableCell>

            <TableCell>
              {/* new schema changes over here added by Govinda */}
              <span className="text-sm">{product.quantity}</span>
              <span className="text-sm">{product.stock}</span>
            </TableCell>
            <TableCell>
              {product.stock > 0 ? (
                <Badge type="success">{t("Selling")}</Badge>
              ) : (
                <Badge type="danger">{t("SoldOut")}</Badge>
              )}
            </TableCell>
            <TableCell>
              <Link
                //  just added for slugss
                to={`/product/${product._id}`}
                // to={`/product/${product.slug}`}
                className="flex justify-center text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>
            <TableCell className="text-center">
              <ShowHideButton id={product?._id} status={product?.status} />
              {/* {product.status} */}
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={product._id}
                product={product}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={showingTranslateValue(product?.title[lang], lang)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProductTable;
