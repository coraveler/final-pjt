import { TiWarningOutline } from "react-icons/ti";
import ReactModal from "react-modal";
import api from "../../api/axios";

function MapCardDeleteModal({
    mapCardDeleteModalStatus,
    mapCardDeleteModalClose,
    img,
    getMapShareImg
}){

    const deleteMapCard = async () => {
        try{
            await api.delete(`/api/mapshare?mapId=${img.mapId}&mapImgUrl=${img.mapImgUrl}`)
            getMapShareImg();
        }catch(e){
            console.log(e);
        }
        
    }

    return(
        <div>
            <ReactModal
                isOpen={mapCardDeleteModalStatus}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1001},
                    content: {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        right: 'auto',
                        bottom: 'auto',
                        borderRadius: '20px',
                        padding: '20px',
                        width: '20vw'}}}>
                    
                <div style={{textAlign:'center'}}>
                    <TiWarningOutline style={{fontSize:'40px', color:'red'}}/><p/>
                    <div>
                        일정을 정말 삭제하시겠습니까?
                    </div><br/>

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3'}}
                        onClick={()=>deleteMapCard()}
                    >삭제
                    </button>&nbsp;&nbsp;

                    <button
                        className="button select-button"
                        style={{width:"6vw", border:'2px solid #a9a3a3'}}
                        onClick={mapCardDeleteModalClose}
                    >닫기
                    </button>
                </div>
            </ReactModal>
        </div>
    )
}

export default MapCardDeleteModal;