import { Card, Divider, List, Popover, Tag } from 'antd';
import IconSvg from '@/components/IconSvg';

const svgIcons: any = [
  'home',
  'set',
  'user',
  'pwd',
  'permissions',
  'message',
  'tick',
  'theme',
  'refresh',
  'more',
  'language-outline',
  'icon',
  'editor',
  'edit',
  'detail',
  'control',
  'close',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'arrow-left2',
  'arrow-right2',
  'page',
  'list',
  'money',
  'book-open-reader',
];

function App() {
  return (
    <div className='layout-main-content'>
      <Card bordered={false}>
        <div>
          {svgIcons.map((item: any) => (
            <div className="block float-left h-24 text-base mt-2 overflow-hidden py-2 px-5 text-center w-32" key={item}>
              <Popover content={`<IconSvg name="${item}" />`}>
                <div>
                  <IconSvg name={item} style={{ fontSize: '30px' }} />
                  <span className="block text-base mt-2">{item}</span>
                </div>
              </Popover>
            </div>
          ))}
        </div>
        <Divider />
        <List header={<h2>Illustrate:</h2>}>
          <List.Item>Component Location: @/components/IconSvg</List.Item>
          <List.Item>Reason for creation: easy to customize the use of svg icons </List.Item>
        </List>
        <List header={<h3>Instructions:</h3>}>
          <List.Item>
            1. Download or make svg files and store them in <Tag>/src/assets/iconsvg</Tag>
            directory, you can delete the svg in this directory.
          </List.Item>
          <List.Item>
            2. The project will be based on <Tag>/src/assets/iconsvg/svgo.yml</Tag>
            Operate independently <Tag>npm run svgo</Tag> compressed svg
          </List.Item>
          <List.Item>3. Use Demo:</List.Item>
          <List.Item>import IconSvg from &apos;@/components/IconSvg&apos;;</List.Item>
          <List.Item>&lt;IconSvg name=&apos;svg file name&apos; /&gt;</List.Item>
        </List>
      </Card>
    </div>
  );
}

export default App;
