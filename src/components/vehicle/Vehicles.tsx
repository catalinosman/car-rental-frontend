import { MouseEventHandler, useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { AnyAction} from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { VehicleId, getAllVehicles, getVehicle} from '../../features/vehicles/vehicleSlice';
import { Vehicle } from "../../types"
import { Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getReviewsByVehicle } from '../../features/reviews/reviewSlice';
import CreateVehicleModal from './CreateVehicleModal';
import RemoveVehicleButton from './RemoveVehicleModal';
import UpdateVehicleInfo from './UpdateVehicleModal';
import { Modal } from "@mui/material";
import jwt_decode from 'jwt-decode';

const Vehicles = () => {
    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch(); 
    const navigate = useNavigate();
    
    const vehicles = useSelector(
        (state: RootState) => state.vehicle.vehicle as Vehicle[]
    );

    const [ nameFilter, setNameFilter ] = useState("");
    const [ categoryNumber, setCategoryNumber ] = useState("");
    const [ orderBy, setOrderBy] = useState("");
    const [openModal, setOpenModal] = useState(false); 
    const [createModal, setCreateModal] = useState(false);
    // testing
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ imageURL, setImageURL ] = useState("");

    
    const handleOpenCreate = () => {
        setCreateModal(true);
    };

    const handleCloseCreate = () => {
        setCreateModal(false);
    }


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const token:any = localStorage.getItem?.('token');
    let userRole:any = null;
  if (token) {
    const decodedToken: any = jwt_decode(token);
    console.log(decodedToken);
    userRole = decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }

    useEffect(() => {
        dispatch(getAllVehicles({orderBy:"", name: nameFilter, categoryId: categoryNumber}));
    },[orderBy, nameFilter, categoryNumber, dispatch]);

    const handleGetVehicle = (vehicleId: number | undefined) => {
      //  dispatch(getVehicle({vehicleId: vehicleId}))
        dispatch(getVehicle({
            id: vehicleId,
            name: name,
            description: description,
            price: price,
            imageURL: imageURL
        }))
        dispatch(getReviewsByVehicle({vehicleId: vehicleId}))
        navigate(`/vehicle/${vehicleId}`)
    };
 
    const suvCategory: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setCategoryNumber("4");
    dispatch(getAllVehicles({ orderBy: "", name: "", categoryId: "4" }));
  };

    const allVehicles: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setCategoryNumber("");
    dispatch(getAllVehicles({ orderBy: "", name: "", categoryId: "" }));
  };

    const sportCategory: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setCategoryNumber("5");
    dispatch(getAllVehicles({ orderBy: "", name: "", categoryId: "5" }));
  };

    const sedanCategory: React.MouseEventHandler<HTMLButtonElement> = async () => {
    setCategoryNumber("7");
    dispatch(getAllVehicles({ orderBy: "", name: "", categoryId: "7" }));
  };

    const orderAZ: React.MouseEventHandler<HTMLButtonElement> = async () => {
        setOrderBy("a-z");
        dispatch(getAllVehicles({orderBy: "a-z", name: "", categoryId: categoryNumber}));
    };

    const orderZA: React.MouseEventHandler<HTMLButtonElement> = async () => {
        setOrderBy("z-a");
        dispatch(getAllVehicles({orderBy: "z-a", name: "", categoryId: categoryNumber}));
    };

    const highToLow: React.MouseEventHandler<HTMLButtonElement> = async () => {
        setOrderBy("highestprice");
        dispatch(getAllVehicles({orderBy: "highestprice", name: "", categoryId: categoryNumber}));
    };

    const lowToHigh: React.MouseEventHandler<HTMLButtonElement> = async () => {
        setOrderBy("lowestprice");
        dispatch(getAllVehicles({orderBy: "lowestprice", name: "", categoryId: categoryNumber}));
    };




    return ( 
        <div>
                <div className="filter">
                    <div>
        <Button onClick={allVehicles}>
                <Typography >
                    ALL
                </Typography>
        </Button>
             <Button onClick={suvCategory}>
                    <Typography >
                        SUVs
                    </Typography>
            </Button>
            <Button onClick={sportCategory}>
                    <Typography >
                        Sport
                    </Typography>
            </Button>
            <Button onClick={sedanCategory}>
                    <Typography >
                        Sedan
                    </Typography>
            </Button>
            </div>
           <div className="filterName">
           <Button onClick={orderAZ}>
                    <Typography >
                        A-Z
                    </Typography>
            </Button>
            <Button onClick={orderZA}>
                    <Typography >
                        Z-A
                    </Typography>
            </Button>
            <Button onClick={highToLow}>
                    <Typography >
                        High-Low
                    </Typography>
            </Button>
            <Button onClick={lowToHigh}>
                    <Typography >
                        Low-High
                    </Typography>
            </Button></div>
                </div>
                <div className="searchBar">
                <label htmlFor="nameFilter">Filter by name: </label>
          <input
            type="text"
            id="nameFilter"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="inputStyle"
                />
               {(userRole === "Admin") ? (
    <Button variant="contained" color="primary" onClick={handleOpenCreate}>
                        Create Vehicle
                    </Button>) : null}
                    <Modal open={createModal} onClose={handleCloseCreate} className="createModalStyle">
                            <CreateVehicleModal />
                        </Modal>

                </div>
            <Grid container spacing={7} padding={8}>
                {vehicles && vehicles.map(v => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={v.id} >
                        <Card sx={{ maxWidth: 815, margin: 'auto', maxHeight: 800, marginTop: 3 }}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={v.imageURL}
                            />
                            <CardContent>
                                <Button>
                                <Typography gutterBottom variant="h5" component="div" onClick={() => handleGetVehicle(v.id)}>
                                    {v.name}
                                </Typography>
                                </Button>
                                <Typography variant="body2" color="text.secondary">
                                    {v.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>
                                    Price : {v.price} $
                                </Typography>
                                {(userRole === "Admin") ? (<RemoveVehicleButton vehicleId={v.id} />) : null}
                                
{(userRole === "Admin") ? (
   <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Update Vehicle
      </Button>) : null}

    <Modal open={openModal} onClose={handleCloseModal} className="updateModalStyle">
        <UpdateVehicleInfo vehicleId={v.id} name={v.name} description={v.description} price={v.price} imageURL={v.imageURL} />
      </Modal>  
   
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default Vehicles;

