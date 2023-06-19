import ButtonDeleteDoubleCheck from 'components/shared-components/Buttons/ButtonDeleteDoubleCheck';
import CustomTable from 'components/shared-components/CustomTable';
import React, { useEffect, useState } from 'react';
import { Tooltip, Tag, message, Modal, Button  } from 'antd';
import {EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import MusicService from 'services/MusicService';
import MusicForm from './MusicForm';
import MusicDetails from './MusicDetails';

export const Musics = () => {
  const [musics, setMusics] = useState();
  const [visibleModelEdit, setVisibleModelEdit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModalNew, setVisibleModalNew] = useState(false);
  const [musicDetailsVisible, setMusicDetailsVisible] = useState(false);
  const [loadingToogleDeleteMusic, setLoadingToogleDeleteMusic] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState();
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: 'Artist',
      dataIndex: 'artist',
      key: 'artist',
      sorter: {
          compare: (a, b) => {
              a = a.artist.toLowerCase();
              b = b.artist.toLowerCase();
              return a > b ? -1 : b > a ? 1 : 0;
          },
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: {
          compare: (a, b) => {
              a = a.title.toLowerCase();
              b = b.title.toLowerCase();
              return a > b ? -1 : b > a ? 1 : 0;
          },
      },
    },
    {
      title: 'Album',
      dataIndex: 'album',
      key: 'album',
      sorter: {
          compare: (a, b) => {
              a = a.album.toLowerCase();
              b = b.album.toLowerCase();
              return a > b ? -1 : b > a ? 1 : 0;
          },
      }
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: {
          compare: (a, b) => {
              a = a.year
              b = b.year
              return a > b ? -1 : b > a ? 1 : 0;
          },
      }
    },
    {
      title: 'Genre',
      key: 'genre',
      dataIndex: 'genre',
      sorter: {
          compare: (a, b) => {
              a = a.genre.toLowerCase();
              b = b.genre.toLowerCase();
              return a > b ? -1 : b > a ? 1 : 0;
          },
      },
      render: genre => (
        <Tag key={genre}>
          {genre.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, elm) => (
        <div className="text-right d-flex justify-content-start">
          <Tooltip title="Edit Music">
              <Button style={{ background: "green", borderColor: "green" }} type="primary" className="mr-2" icon={<EditOutlined />} onClick={() => {editMusic(elm)}} size="small"/>
          </Tooltip>
          <Tooltip title="Extra info">
              <Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => {showMusicDetails(elm)}} size="small"/>
          </Tooltip>
          <Tooltip title="Delete Music">
              <Button style={{ }} type="danger" className="mr-2" icon={<DeleteOutlined />} onClick={() => {deleteMusic(elm.id)}} size="small"/>
          </Tooltip>
        </div>
      ),
    },
  ];

  const newMusic = () => {
    setSelectedMusic({
      "year": new Date().getFullYear(),
      "album": "",
      "artist": "",
      "genre": "",
      "title": ""
    });

    setVisibleModalNew(true)
  }

  const handleNewOK = (values) => {
    setConfirmLoading(true);

    MusicService.create(values).then((response) => {
        if(response) {
            getMusics();
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
}

  const handleCancel = () => {
    setSelectedMusic({});
    setVisibleModalNew(false);
    setVisibleModelEdit(false);
  }

  const showMusicDetails = musicInfo => {
    setMusicDetailsVisible(true);
    setSelectedMusic(musicInfo);
  };

  const editMusic = (user) => {
    setSelectedMusic(user);
    setVisibleModelEdit(true)
    setConfirmLoading(false);
  }

  const handleEdit = (values) => {
    setConfirmLoading(true);

    MusicService.update(selectedMusic.id, values).then(response => {
        if (response) { 
            getMusics();
            message.success("Music updated successfully");
            setVisibleModelEdit(false);
        } else {
            message.error("Error");
        }

        setConfirmLoading(false);
    }).catch((e) => {
        setConfirmLoading(false);
        console.log(e);
    });
  }

  const closeMusicDetails = () => {
    setMusicDetailsVisible(false);
    setSelectedMusic(null);
  }

  const deleteMusic = (music) => {
    setLoadingToogleDeleteMusic(true);
    MusicService.deleteMusic(music).then(response => {
        getMusics();
        message.success("Music deleted successfully");
        setLoadingToogleDeleteMusic(false);
    }).catch((e) => {
      console.log('erro');
        console.log(e);
    });
    
}

  const getMusics = () => {
    setLoading(true);
    MusicService.getAll().then((response) => {
        setMusics(response);
        setLoading(false);
        setLoadingToogleDeleteMusic(false);
    }).catch(() => {
        message.error('There was an error, contact support');
    })
  }

  useEffect(() => {
    getMusics();
  }, [])

  return (
    <>  
      <CustomTable
          title="Musics"
          onNewButton={newMusic}
          columns={columns}
          dataSource={musics}
          key={newMusic.id}
          // loading=""
          onChangeSearch="" 
      />
      <MusicDetails data={selectedMusic} visible={musicDetailsVisible} close={()=> {closeMusicDetails()}}/>
          <Modal
              title='Music'
              open={visibleModalNew}
              onCancel={handleCancel}
              confirmLoading={confirmLoading}
              width={700}
              footer={null}
          >
              <MusicForm 
                  isEditMusic={false} 
                  selectedMusic={selectedMusic} 
                  setSelectedMusic={setSelectedMusic} 
                  handleSubmit={handleNewOK} 
                  handleCancel={handleCancel} 
                  loading={confirmLoading}
              />
          </Modal>
          <Modal
              title="Update Music"
              open={visibleModelEdit}
              onCancel={handleCancel}
              confirmLoading={confirmLoading}
              width={1000}
              footer={null}
          >
              <MusicForm 
                  isEditMusic={true} 
                  selectedMusic={{...selectedMusic}} 
                  setSelectedMusic={setSelectedMusic} 
                  handleCancel={handleCancel} 
                  handleSubmit={handleEdit} 
                  loading={confirmLoading}
              />
          </Modal>
    </>
  )
}


export default Musics;
