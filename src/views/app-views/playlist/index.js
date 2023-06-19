import CustomTable from 'components/shared-components/CustomTable';
import React, { useEffect, useState } from 'react';
import { Tooltip, message, Modal, Button  } from 'antd';
import {EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ReproductionListService from 'services/ReproductionListService';
import ReproductionListForm from './ReproductionListForm';
import ReproductionListDetails from './ReproductionListDetails';

export const ReproductionList = () => {
  const [reproductionLists, setReproductionLists] = useState([]);
  const [visibleModelEdit, setVisibleModelEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModalNew, setVisibleModalNew] = useState(false);
  const [reproductionDetailsVisible, setReproductionDetailsVisible] = useState(false);
  const [loadingToogleDeleteMusic, setLoadingToogleDeleteReproductionList] = useState(false);
  const [selectedReproductionList, setSelectedReproductionList] = useState();
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: {
          compare: (a, b) => {
              a = a.name.toLowerCase();
              b = b.name.toLowerCase();
              return a > b ? -1 : b > a ? 1 : 0;
          },
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: {
          compare: (a, b) => {
              a = a.description.toLowerCase();
              b = b.description.toLowerCase();
              return a > b ? -1 : b > a ? 1 : 0;
          },
      },
    },
    {
      title: 'Musics',
      dataIndex: 'musics',
      key: 'musics',
      render: (musics, elm) => (
        <span>{concatMusicTiles(musics)}</span>        
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, elm) => (
        <div className="text-right d-flex justify-content-end">
          <Tooltip title="Edit Reproduction List">
              <Button style={{ background: "green", borderColor: "green" }} type="primary" className="mr-2" icon={<EditOutlined />} onClick={() => {editReproductionList(elm)}} size="small"/>
          </Tooltip>
          <Tooltip title="Extra info">
              <Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {showReproductionListDetails(elm)}} size="small"/>
          </Tooltip>
          <Tooltip title="Delete Reproduction List">
              <Button style={{ }} type="danger" className="mr-2" icon={<DeleteOutlined />} onClick={() => {deleteReproductionList(elm.id)}} size="small"/>
          </Tooltip>
        </div>
      ),
    },
  ];

  const newReproductionList = () => {
    setSelectedReproductionList({
      "name": '',
      "description": "",
      "musicIds": '',
    });

    setVisibleModalNew(true)
  }

  const concatMusicTiles = (musics) => {
    var musicTitles = "";
    const TOTAL_MUSICS_EXIBITION = 2;

    musics.map( (music, index) => {
      if(index <= TOTAL_MUSICS_EXIBITION ){
        if(index == TOTAL_MUSICS_EXIBITION ){
          musicTitles = musicTitles.concat(music.title, "...");
        } else if(hasNextIndex(index, musics) ) {
          musicTitles = musicTitles.concat(music.title, ", "); 
        }
      } 
      
    })

    return musicTitles;
  }

  const hasNextIndex = (currentIndex, object) => {
    var castedObject = Object.keys(object);
    return castedObject.at(currentIndex + 1) != null;
  }

  const handleNewOK = (values) => {
    setConfirmLoading(true);
    
    console.log(values);
    
    setConfirmLoading(false);

    if(values.musicIds.length > 1){
      var newReproductionList = {
        "name": values?.name,
        "description": values?.description,
        "musicIds": values?.musicIds
      };
  
      ReproductionListService.create(newReproductionList).then((response) => {
          if(response) {
              getReproductionLists();
              setVisibleModalNew(false);
              message.success("Success!")
          } else {
            message.error("Error, could not create record");
          }
          setConfirmLoading(false);
      }).catch(() => {
          setConfirmLoading(false);
          message.error("Error, could not create record");
      });
    } else {
      setConfirmLoading(false);
      message.error("Error, choose at least 1 song");
    }

}

  const handleCancel = () => {
    setSelectedReproductionList({});
    setVisibleModalNew(false);
    setVisibleModelEdit(false);
  }

  const showReproductionListDetails = reproductionListInfo => {
    setReproductionDetailsVisible(true);
    setSelectedReproductionList(reproductionListInfo);
  };

  const editReproductionList = (user) => {
    setSelectedReproductionList(user);
    setVisibleModelEdit(true)
    setConfirmLoading(false);
  }

  const handleEdit = (values) => {
    setConfirmLoading(true);

    if(values.musicIds.length > 1){

      ReproductionListService.update(selectedReproductionList.id, values).then(response => {
          if (response) { 
              getReproductionLists();
              message.success("Reproduction list updated successfully");
              setVisibleModelEdit(false);
          } else {
              message.error("Error");
          }

          setConfirmLoading(false);
      }).catch((e) => {
          setConfirmLoading(false);
          console.log(e);
      });
    } else {
      setConfirmLoading(false);
      message.error("Error, choose at least 1 song");
    }

    setConfirmLoading(false);
  }

  const closeReproductionListDetails = () => {
    setReproductionDetailsVisible(false);
    setSelectedReproductionList(null);
  }

  const deleteReproductionList = (id) => {
    setLoadingToogleDeleteReproductionList(true);
    ReproductionListService.deleteReproductionList(id).then(response => {
        getReproductionLists();
        message.success("Reproduction list deleted successfully");
        setLoadingToogleDeleteReproductionList(false);
    }).catch((e) => {
        console.log(e);
    });
    
  }

  const getReproductionLists = () => {
    setLoading(true);
    ReproductionListService.getAll().then((response) => {
        console.log(response);
        setReproductionLists(response);
        setLoading(false);
        setLoadingToogleDeleteReproductionList(false);
    }).catch(() => {
        message.error('There was an error, contact support');
    })
  }

  const handleSearch = (name) => {

    setLoading(true);
    if( name != '') {
      ReproductionListService.getByName(name).then((response) => {
        setReproductionLists(response);
        setLoading(false);
      }).catch(() => {
          setLoading(false);  
          getReproductionLists();
          message.error('There was an error, contact support');
      })
    }else {
      getReproductionLists();
    }
    

  }

  useEffect(() => {
    getReproductionLists();


  }, [])

  return (
    <>  
      <CustomTable
          title="Reproduction List"
          onNewButton={newReproductionList}
          columns={columns}
          dataSource={reproductionLists}
          key={newReproductionList?.id}
          loading={loading}
          onChangeSearch={handleSearch} 
      />
      <ReproductionListDetails data={selectedReproductionList} visible={reproductionDetailsVisible} close={()=> {closeReproductionListDetails()}}/>
          <Modal
              title='New Reproduction List'
              open={visibleModalNew}
              onCancel={handleCancel}
              confirmLoading={confirmLoading}
              width={700}
              footer={null}
          >
              <ReproductionListForm 
                  isEditReproductionList={false} 
                  selectedReproductionList={selectedReproductionList} 
                  setSelectedReproductionList={setSelectedReproductionList} 
                  handleSubmit={handleNewOK} 
                  handleCancel={handleCancel} 
                  loading={confirmLoading}
              />
          </Modal>
          <Modal
              title="Update Reproduction List"
              open={visibleModelEdit}
              onCancel={handleCancel}
              confirmLoading={confirmLoading}
              width={1000}
              footer={null}
          >
              <ReproductionListForm 
                  isEditReproductionList={true} 
                  selectedReproductionList={{...selectedReproductionList}} 
                  setSelectedReproductionList={setSelectedReproductionList} 
                  handleCancel={handleCancel} 
                  handleSubmit={handleEdit} 
                  loading={confirmLoading}
              />
          </Modal>
    </>
  )
}


export default ReproductionList;
