import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Link, useNavigate } from 'react-router-dom';
import { Loading } from './Loading';
export const Users = () => {

 let [data, setData] = useState([]);
 let [currentPost, setCurrentPost] = useState(null);
 const navigate = useNavigate();
    useEffect(() => {
        const loadData = async() => {
            let response = await fetch(`https://jsonplaceholder.typicode.com/users`);
            let data = await response.json();
            setData(data);
            console.log("Finished");
        }
        loadData();
    }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">View Posts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.address.street} {row.address.suite} {row.address.city} {row.address.zipcode}</TableCell>
              
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">
              <Link to="/users-posts" state={{ id: row.id }}> <div><RemoveRedEyeIcon /></div> </Link>
              </TableCell>
            </TableRow>
          ) ) : <Loading />}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
