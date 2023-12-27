import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material'; 
import './index.css';

const CustomTable = ({data}) => {
    

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Nome</strong></TableCell>
            <TableCell><strong>Bairro</strong></TableCell>
            <TableCell><strong>Número</strong></TableCell>
            <TableCell><strong>Editar</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {item.status ? (
                  <Checkbox style={{ color: 'green' }} checked />
                ) : (
                  <Close style={{ color: 'red' }} />
                )}
              </TableCell>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.bairro}</TableCell>
              <TableCell>{item.numero}</TableCell>
              <TableCell>
                <Edit style={{ color: 'blue', cursor: 'pointer' }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
