import { Layout, Tabs, Flex } from 'antd';
import { useContext, useEffect } from 'react';
import { AlertOutlined, FileTextOutlined, PictureOutlined, BorderOutlined, BulbOutlined, AppstoreOutlined } from '@ant-design/icons';
import TextPanel from './TextPanel';
import ImagePanel from './ImagePanel';
import ShapePanel from './ShapePanel';
import PaintPanel from './PaintPanel';
import DesignPanel from './DesignPanel';
import Header from '../header';
import TextFx from './TextFx';
import { GloablStateContext } from '@/context';

import './index.scss';
import { useState } from 'react';

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRight: '1px solid #e8e8e8'
};

const iconStyle = { fontSize: 18, marginRight: 0 };

const OBJECT_TYPES = [
  {
    label: '设计',
    value: 'design',
    icon: <AlertOutlined style={iconStyle} />
  },
  {
    label: '文字',
    value: 'text',
    icon: <FileTextOutlined style={iconStyle} />
  },
  {
    label: '图片',
    value: 'image',
    icon: <PictureOutlined style={iconStyle} />
  },
  {
    label: '形状',
    value: 'shape',
    icon: <BorderOutlined style={iconStyle} />
  },
  {
    label: '画笔',
    value: 'paint',
    icon: <BulbOutlined style={iconStyle} />
  },
  {
    label: '应用',
    value: 'app',
    icon: <AppstoreOutlined style={iconStyle} />
  }
];

export default function Panel () {
  const { fxType, setFxType } = useContext(GloablStateContext);
  const [activeKey, setActiveKey] = useState('design');
  const [designDefaultKey, setDesignDefaultKey] = useState('template');

  const renderPanel = (value) => {
    if (value === 'design') {
      return <DesignPanel defaultKey={designDefaultKey} />;
    }
    if (value === 'text') {
      return <TextPanel />;
    }
    if (value === 'image') {
      return <ImagePanel />;
    }
    if (value === 'shape') {
      return <ShapePanel />;
    }
    if (value === 'paint') {
      return <PaintPanel />;
    }
    return null;
  }

  const renderLabel = (item) => {
    return (
      <Flex vertical justify="center">
        <div>{item.icon}</div>
        <div>{item.label}</div>
      </Flex>
    )
  }

  const handleTabChange = (k) => {
    setDesignDefaultKey('layers');
    setActiveKey(k);
    setFxType('');
  }

  useEffect(() => {
    if (fxType) {
      setActiveKey('');
    }
  }, [fxType]);

  return (
    <Sider
      style={siderStyle}
      width={420}
      className="fabritor-sider"
    >
      <Header />
      <Tabs
        activeKey={activeKey}
        tabPosition="left"
        style={{ flex: 1, overflow: 'auto' }}
        size="small"
        destroyInactiveTabPane
        onChange={handleTabChange}
        items={
          OBJECT_TYPES.map((item) => {
            return {
              label: renderLabel(item),
              key: item.value,
              children: renderPanel(item.value)
            };
          })
        }
      />
      {
        fxType === 'text' ? <TextFx /> : null
      }
    </Sider>
  )
}