import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';
import './timeline-css.css';
import ReactLoading from 'react-loading';

import { withFirebase } from '../Firebase';
import html from './html.svg';

import { Box, Grommet, Button, Layer, Heading, Grid, Image, Text, Anchor } from 'grommet';

// Grommet doesnt work for some reason
const template0 = item => {

  if(item.format == "url")
  {
      if(item.imageURL == "" || item.imageURL == null)
      {
        var title = item.title.split(" ").slice(0, 4).join(" ");

        return '<div style=\"display:table;width:30px;height:30px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:30px;height:30px;' +
           'font-family:system-ui;font-size:10px;word-wrap:break-word;white-space:initial;line-height:10px;" >' + title + '</div></div>';
      }
      else
      {
        return '<img src=' + item.imageURL + ' style=\"object-fit:cover;width:30px;height:30px;border:-10px;\" />';
      }
  }
  else if(item.format == "note")
  {
    var noteTitle = '✏️ '.concat(item.title.substring(0, 25));
    return '<div style=\"display:table;width:30px;height:30px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:30px;height:30px;' +
       'font-family:system-ui;font-size:10px;word-wrap:break-word;white-space:initial;line-height:10px;" >' + noteTitle + '</div></div>';
  }
}

const template1 = item => {

  if(item.format == "url")
  {
      if(item.imageURL == "" || item.imageURL == null)
      {
        var title = item.title.split(" ").slice(0, 6).join(" ");
        return '<div style=\"display:table;width:48px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:48px;' +
           'font-family:system-ui;font-size:9px;word-wrap:break-word;white-space:initial;line-height:9px;" >' + title + '</div></div>';
      }
      else
      {
        return '<img src=' + item.imageURL + ' style=\"object-fit:cover;width:48px;height:48px;border:-10px;\" />';
      }
  }
  else if(item.format == "note")
  {
    var noteTitle = '✏️ '.concat(item.title.substring(0, 40));
    return '<div style=\"display:table;width:48px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:48px;' +
       'font-family:system-ui;font-size:12px;word-wrap:break-word;white-space:initial;line-height:12px;" >' + noteTitle + '</div></div>';
  }
}

const template2 = item => {

  if(item.format == "url")
  {
      if(item.imageURL == "" || item.imageURL == null)
      {
        var title = item.title.split(" ").slice(0, 10).join(" ");
        return '<div style=\"display:table;width:120px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:120px;' +
           'font-family:system-ui;font-weight:bolder;font-size:14px;word-wrap:break-word;white-space:initial;line-height:15px;" >' + title + '</div></div>';
      }
      else
      {
        var title = item.title.split(" ").slice(0, 10).join(" ");
        return '<div style=\"display:table;width:120px;padding:3px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:120px;' +
           'font-family:system-ui;font-weight:bolder;font-size:14px;word-wrap:break-word;white-space:initial;line-height:15px;" >' + title + '</div></div>'
           + '<img src=' + item.imageURL + ' style=\"object-fit:cover;width:120px;height:70px;border:0px;\" />';
      }
  }
  else if(item.format == "note")
  {
    var noteTitle = '✏️ '.concat(item.title);
    return '<div style=\"display:table;width:120px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:120px;' +
       'font-family:system-ui;font-weight:bolder;font-size:14px;word-wrap:break-word;white-space:initial;line-height:15px;" >' + noteTitle + '</div></div>';
  }
}

const template3 = item => {

  if(item.format == "url")
  {
      if(item.imageURL == "" || item.imageURL == null)
      {
        var title = item.title;
        return '<div style=\"display:table;width:200px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:200px;' +
           'font-family:system-ui;font-weight:bolder;font-size:14px;word-wrap:break-word;white-space:initial;line-height:15px;" >' + title + '</div></div>'
           + '<div style=\"display:table;width:200px;\"><div style="display: table-cell;text-align:left;vertical-align:middle;width:200px;' +
              'font-family:system-ui;font-size:13px;word-wrap:break-word;white-space:initial;line-height:14px;" >' + item.summary.substring(0, 70) + '</div></div>';
      }
      else
      {
        var title = item.title.split(" ").slice(0, 10).join(" ");
        return '<div style=\"display:table;width:200px;padding:3px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:200px;' +
           'font-family:system-ui;font-weight:bolder;font-size:14px;word-wrap:break-word;white-space:initial;line-height:15px;" >' + title + '</div></div>'
           + '<img src=' + item.imageURL + ' style=\"object-fit:cover;width:200px;height:140px;border:0px;\" />'
           + '<div style=\"display:table;width:200px;\"><div style="display: table-cell;text-align:left;vertical-align:middle;width:200px;' +
              'font-family:system-ui;font-size:13px;word-wrap:break-word;white-space:initial;line-height:14px;" >' + item.summary.substring(0, 70) + '</div></div>';
      }
  }
  else if(item.format == "note")
  {
    var noteTitle = '✏️ '.concat(item.title);
    return '<div style=\"display:table;width:200px;\"><div style="display: table-cell;text-align:center;vertical-align:middle;width:200px;' +
       'font-family:system-ui;font-weight:bolder;font-size:14px;word-wrap:break-word;white-space:initial;line-height:15px;" >' + noteTitle + '</div></div>'
       + '<div style=\"display:table;width:200px;\"><div style="display: table-cell;text-align:left;vertical-align:middle;width:200px;' +
          'font-family:system-ui;font-size:13px;word-wrap:break-word;white-space:initial;line-height:14px;" >' + item.summary.substring(0, 70) + '</div></div>';
;
  }
}

class TimelineComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      items: [],
      options: {},
      templateOption: 1,
      itemShown: null
    };

    this.timelineWrapperRef = React.createRef();
  }

  componentDidMount() {
    this.setState({ loading: true });

    console.log("calling function...");
    this.props.firebase.getSavedContentForTimeline(this.setUpTimeline);
  }

  setUpTimeline = (savedContent, minDate, maxDate) => {
    console.log("IN setUpTimeline")
    console.log("savedContent: ");
    console.log(savedContent);
    console.log("minDate: " + minDate);
    console.log("maxDate: " + maxDate);

    var tOptions = {
      template: function (item, element, data) {
        return template1(item);
      },
      width: '100%',
      height: '680px',
      showMajorLabels: true,
      showCurrentTime: true,
      format: {
        minorLabels: {
          minute: 'h:mma',
          hour: 'ha'
        },
      },
      zoomMin: 1.08e+7,
      margin: {
          item : {
            //horizontal : 0
          }
      },
      max: maxDate,
      min: minDate,
      showTooltips: false
    }

    this.setState({ loading: false, items: savedContent, options: tOptions });
  };

  clickHandler = (event) => {
    console.log(event);
    if(event.item == null)
    { return null; }

    var content = this.state.items[event.item];

    if(content.format=="note")
    {
      content.title = "✏️ " + content.title;
    }
    if(content.notes==null || content.notes=="")
    {
      content.notes="No personal notes yet!"
    }
    if(content.summary==null || content.summary=="")
    {
      content.notes="No summary yet!"
    }
    if(content.link==null || content.link=="")
    {
      content.format = "note";
    }


    this.setState({itemShown: content});
  };

  closeModal = () => {
    this.setState({itemShown: null});
  };

  templateOptionClicked = index => {
    console.log('clocked template option ' + index)

    var optionsCopy = JSON.parse(JSON.stringify(this.state.options));

    if(index == 0)
    {
      optionsCopy.template =  function (item, element, data) {
        return template0(item);
      };
    }
    else if (index == 1) {
      optionsCopy.template =  function (item, element, data) {
        return template1(item);
      };
    }
    else if (index == 2){
      optionsCopy.template =  function (item, element, data) {
        return template2(item);
      };
    }
    else if (index == 3){
      optionsCopy.template =  function (item, element, data) {
        return template3(item);
      };
    }
    this.setState({ templateOption: index, options: optionsCopy });
  };

  render() {
    const { loading, options, items, templateOption, itemShown } = this.state;

    return (
      <div>
        {loading && <div style={{
          position: 'absolute', left: '50%', top: '60%',
          transform: 'translate(-50%, -50%)'
        }}>
            <ReactLoading type="bars" color="black" height={'30%'} width={'30%'} />
        </div>}

        {!loading &&
          <div>
        <Box
          direction='row'
          align='center'
          gap='small'
          justify='center'
          height='30px'
          >
          <Button
            label="xsmall"
            plain={true}
            color={templateOption===0 ? 'accent-1':'light-2'}
            onClick={() => {this.templateOptionClicked(0)}}
          />
          <Button
            label="small"
            plain={true}
            color={templateOption===1 ? 'accent-1':'light-2'}
            onClick={() => {this.templateOptionClicked(1)}}
          />
          <Button
            label="medium"
            plain={true}
            color={templateOption===2 ? 'accent-1':'light-2'}
            onClick={() => {this.templateOptionClicked(2)}}
          />
          <Button
            label="large"
            plain={true}
            color={templateOption===3 ? 'accent-1':'light-2'}
            onClick={() => {this.templateOptionClicked(3)}}
          />
        </Box>

        <Timeline
          options={options}
          items={items}
          clickHandler={this.clickHandler}
        />
        </div>
      }

        {itemShown && itemShown.format=="url" && (
            <Layer
              onEsc={() => this.closeModal()}
              onClickOutside={() => this.closeModal()}
              plain={false}
              modal={true}
              pad="small"
              >
                <Grid
                  rows={['auto', 'auto', 'auto']}
                  columns={['medium', 'medium']}
                  gap="small"
                  margin="medium"
                  align="center"
                  areas={[
                    { name: 'header', start: [0, 0], end: [1, 0] },
                    { name: 'photo', start: [0, 1], end: [0, 1] },
                    { name: 'tagsSummary', start: [1, 1], end: [1, 1] },
                    { name: 'personalNotes', start: [0, 2], end: [1, 2] },
                  ]}
                >
                  <Heading size="small" level="2" color="black" gridArea="header" align="center" margin="0">
                      <Anchor href={itemShown.link} color="black" label={itemShown.title} />
                  </Heading>

                  <Box gridArea="photo" width="auto" height="small" background="light-5">
                    <Image
                        fit='cover'
                        src={itemShown.imageURL}
                      />
                  </Box>

                  <Box gridArea="tagsSummary" direction="column" gap="xsmall" alignSelf="start">
                    <Heading size="small" level="4" color="black" margin="0">
                        TAGS
                    </Heading>

                    <div>
                    {itemShown.tags.map((tag) => (
                        <Button
                          margin='xsmall'
                          primary={true}
                          onClick={() => console.log("clicked tag")}
                          label={tag}
                          disabled={true}
                          />
                    ))}
                    </div>

                    <Heading size="small" level="4" color="black" margin="0">
                        SUMMARY
                    </Heading>
                    <Text size="small" color="black" margin="0">
                        {itemShown.summary}
                    </Text>
                  </Box>

                  <Box gridArea="personalNotes" direction="column" gap="xsmall">
                    <Heading size="small" level="4" color="black" margin="0">
                        PERSONAL NOTES
                    </Heading>
                    <Text size="small" color="black" margin="0">
                        {itemShown.notes}
                    </Text>
                  </Box>
                  </Grid>

            </Layer>
          )}

        {itemShown && itemShown.format=="note" && (
          <Layer
            onEsc={() => this.closeModal()}
            onClickOutside={() => this.closeModal()}
            plain={false}
            modal={true}
            pad="small"
            >
              <Grid
                rows={['auto', 'auto', 'auto']}
                columns={['xsmall', 'small']}
                gap="small"
                margin="medium"
                align="center"
                areas={[
                  { name: 'header', start: [0, 0], end: [1, 0] },
                  { name: 'tagsSummary', start: [0, 1], end: [1, 1] },
                  { name: 'personalNotes', start: [0, 2], end: [1, 2] },
                ]}
              >
                <Heading size="small" level="2" color="black" gridArea="header" align="center" margin="0">
                    <Anchor href={itemShown.link} color="black" label={itemShown.title} />
                </Heading>

                <Box gridArea="tagsSummary" direction="column" gap="xsmall" alignSelf="start">
                  <Heading size="small" level="4" color="black" margin="0">
                      TAGS
                  </Heading>

                  <div>
                  {itemShown.tags.map((tag) => (
                      <Button
                        margin='xsmall'
                        primary={true}
                        onClick={() => console.log("clicked tag")}
                        label={tag}
                        disabled={true}
                        />
                  ))}
                  </div>

                  <Heading size="small" level="4" color="black" margin="0">
                      SUMMARY
                  </Heading>
                  <Text size="small" color="black" margin="0">
                      {itemShown.summary}
                  </Text>
                </Box>

                <Box gridArea="personalNotes" direction="column" gap="xsmall">
                  <Heading size="small" level="4" color="black" margin="0">
                      PERSONAL NOTES
                  </Heading>
                  <Text size="small" color="black" margin="0">
                      {itemShown.notes}
                  </Text>
                </Box>
                </Grid>

          </Layer>
        )}

      </div>
    );
  }
}

export default withFirebase(TimelineComponent);
