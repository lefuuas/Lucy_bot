import { React, useState } from "react";
import TextField from "@mui/material/TextField";

import "./index.css";

function Barradepesquisa() {
  return (
    <div id='busca'>
    <form action="/search" class="search" method="get">
        <input id="txtbusca" name="q" type="text" value="" placeholder="Digite o que você procura" />
        <input id="btnBusca" type="submit" value="Ok"/>
    </form>
    </div>
  );
}

export default Barradepesquisa;