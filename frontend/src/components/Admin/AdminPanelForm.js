import React from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../redux/reducers/notificationReducer";
import { addProperty } from "../../redux/reducers/propertyReducer";
import {
  locationDropdownItems,
  purchaseDropdownItems,
  homeDropdownItems,
  maxroomDropdownItems,
  livingroomDropdownItems,
  bathDropdownItems,
} from "../Search/DropdownItems";
import { Link, useHistory } from "react-router-dom";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const AdminPanelForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      dispatch(addProperty(formData));
      history.push("/adminpanel-allproperties");
    } catch (error) {
      dispatch(showNotification(`Ekleme Başarısız Oldu`));
    }
  };

  return (
    <Box mx="auto" width="50%" display="flex" flexDirection="column">
      <h2>Eklemek istediğiniz evin bilgilerini doldurun.</h2>
      <form enctype="multipart/form-data" onSubmit={handleSubmit}>
        <Box mx="auto" width="100%" display="flex" flexDirection="column">
          <FormControl required>
            <InputLabel>Satış Durumu</InputLabel>
            <Select name="option">
              {purchaseDropdownItems.map((option) => (
                <MenuItem value={option.purchaseoption}>
                  {option.purchaseoption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required>
            <InputLabel>Ev Tipi</InputLabel>
            <Select name="propertyType">
              {homeDropdownItems.map((option) => (
                <MenuItem key={option.id} value={option.homeoption}>
                  {option.homeoption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField required name="title" label="Başlık Ekleyin" />
          <TextField
            required
            name="detailed"
            label="Detaylı Açıklama Ekleyin"
          />
          <TextField required name="year" label="Yapılma Yılı" />
          <FormControl required>
            <InputLabel>Lokasyon Seçin</InputLabel>
            <Select name="city">
              {locationDropdownItems.map((option) => (
                <MenuItem key={option.id} value={option.location}>
                  {option.location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField required name="adres" label="Evin Açık Adresi" />
          <FormControl required>
            <InputLabel>Oda Sayısını Belirtin</InputLabel>
            <Select name="roomnumber">
              {maxroomDropdownItems.map((option) => (
                <MenuItem key={option.id} value={option.maxroomoption}>
                  {option.maxroomoption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required>
            <InputLabel>Salon Sayısını Belirtin</InputLabel>
            <Select name="livingroomnumber">
              {livingroomDropdownItems.map((option) => (
                <MenuItem key={option.id} value={option.livingroomoption}>
                  {option.livingroomoption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl required>
            <InputLabel>Banyo Sayısını Belirtin</InputLabel>
            <Select name="bathnumber">
              {bathDropdownItems.map((option) => (
                <MenuItem key={option.id} value={option.bathroomoption}>
                  {option.bathroomoption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            required
            name="price"
            id="standard-basic"
            label="Fiyat €"
          />
          <TextField required name="m2" label="Toplam m2" />
          <TextField required name="liveablem2" label="Yaşanabilir m2" />

          <input
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            name="photos"
          />
          <label htmlFor="raised-button-file">
            <Button
              type="submit"
              style={{ width: "100%", marginTop: "1rem" }}
              variant="raised"
              component="span"
            >
              Evin Fotoğraflarını Yükleyin
            </Button>
          </label>
          <Button
            style={{ width: "20%", margin: "1rem auto" }}
            type="submit"
            variant="outlined"
          >
            Ekle!
          </Button>
        </Box>
      </form>
      <Link to="/adminpanel-allproperties">
        <h3>Bütün evleri görüntüleyin </h3>
      </Link>
    </Box>
  );
};

export default AdminPanelForm;
