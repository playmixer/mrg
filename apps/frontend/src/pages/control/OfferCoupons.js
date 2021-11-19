import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import styled from "styled-components";

import * as offerAction from "../../store/actions/offer";
import Button from "../../components/Button";
import InputText from "../../components/inputs/InputText";
import RadioGroup from "../../components/inputs/RadioGroup";
import InputFile from "../../components/inputs/InputFile";
import * as apiHandle from "../../api";
import {notify} from "../../components/Notification";

const coupons_data = {
  count: 0,
  purchased: 0,
  activated: 0
}

const options_create_coupon_type = [
  {
    title: 'Обычный',
    value: 'default'
  },
  {
    title: 'Из файла',
    value: 'file'
  }
]


const OfferCoupons = ({dispatch, offer, data}) => {
  const [coupons, setCoupons] = useState(coupons_data);
  const [isOpenCreateCoupons, setIsOpenCreateCoupons] = useState(false);
  const [inputForm, setInputForm] = useState({
    offer_id: data.id,
    count: 100,
    type: options_create_coupon_type[0].value
  });
  const [loadFile, setLoadFile] = useState();

  const onChangeForm = (e) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateCoupons = () => {
    const file = loadFile.target.files[0];
    const form = new FormData();
    form.append(
      "file",
      file,
      file.name
    )
    Object.keys(inputForm).map(v =>
      form.append(v, inputForm[v])
    )

    dispatch(offerAction.createCoupons(form))
      .then(res => {
        if (res.success) {
          setCoupons(res.data)
          setIsOpenCreateCoupons(false)
        }
      })
  }

  const onChangeCreateType = (e) => {
    onChangeForm(e)

  }

  useEffect(() => {
    dispatch(offerAction.getCoupons({offer_id: data.id}))
      .then(setCoupons)
  }, [])

  return <div>
    <AttrContainer>
      <AttrDiv>
        Всего: <span>{coupons.count}</span>
      </AttrDiv>
      <AttrDiv>
        Куплено: <span>{coupons.purchased}</span>
      </AttrDiv>
      <AttrDiv>
        Активировано: <span>{coupons.activated}</span>
      </AttrDiv>
    </AttrContainer>
    <CreateCouponsContainer>
      <div>
        <a href={"#"} onClick={() => setIsOpenCreateCoupons(!isOpenCreateCoupons)}>Создать купоны</a>
      </div>
      {isOpenCreateCoupons && <div>
        <div className="mb-3">
          <RadioGroup
            data={options_create_coupon_type}
            onChange={onChangeCreateType}
            name={"type"}
            checked={inputForm.type}
          />
        </div>
        {inputForm.type === options_create_coupon_type[0].value && <div className="mb-3">
          <InputText
            title={"Количество купонов"}
            name={"count"}
            type={"number"}
            style={{width: 200}}
            value={inputForm.count}
            onChange={onChangeForm}
          />
        </div>}
        {inputForm.type === options_create_coupon_type[1].value && <div className="mb-3">
          <InputFile
            title={"Загрузить из файла"}
            accept={".txt"}
            onChange={setLoadFile}
          />
        </div>}
        <div>
          <Button onClick={handleCreateCoupons}>Создать</Button>
        </div>
      </div>}
    </CreateCouponsContainer>
  </div>
}

const AttrDiv = styled.div`
  margin-bottom: 3px;
  margin-right: 15px;
  
  span {
    font-weight: bold;
  }
`
const AttrContainer = styled.div`
  display: flex;
  margin-bottom: 3px;
`
const CreateCouponsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 3px;
`

export default connect(state => ({
  offer: state.offer
}))(OfferCoupons);
