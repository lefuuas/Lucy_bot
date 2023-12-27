import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router"; 

const Team = () => {
  const [imoveis, setImoveis] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate()

  


  useEffect(() => {
    
    fetchImoveis();
  }, []);

  const fetchImoveis = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/auth/imovel/getall", {
        headers: {
          'Authorization': `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      
      const rowsWithId = data.map((row) => ({ ...row, id: row._id }));
      setImoveis(rowsWithId);
    } catch (error) {
      console.error("Error fetching imóveis:", error.message);
    }
  };

  const handleEditClick = (id) => {
    
    navigate(`/edit/${id}`);
  };

  const handleRemoveClick = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/auth/imovel/deletar/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log(`Item with id ${id} removed from the database`);
  
    
      setImoveis((prevImoveis) => prevImoveis.filter((imovel) => imovel.id !== id));
    } catch (error) {
      console.error('Error removing item:', error.message);
    }
  };
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "endereco", headerName: "Endereço", flex: 1 },
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "valor", headerName: "Valor", flex: 0.5 },
    { field: "alugado", headerName: "Alugado", flex: 0.5 },
    { field: "contato_responsavel", headerName: "Contato Responsável", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 1.4,
      renderCell: ({ row }) => (
        <>
          <Box mr={1}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditClick(row._id)}
              startIcon={<EditIcon />}
              sx={{ width: '10%',fontSize: '50%'}}
            >
              Edit
            </Button>
          </Box>
  
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleRemoveClick(row._id)}
            startIcon={<DeleteIcon />}
            sx={{ width: '10%',fontSize: '50%', left: '-15px'}}
          >
            Remove
          </Button>
        </>
      ),
    },
  ];


  return (
    <>
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[700],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              display: "none", 
            },
          }}
        >
          <DataGrid rows={imoveis} columns={columns} getRowId={(row) => row._id} />
        </Box>
      </Box>
    </>
  );
};

export default Team;