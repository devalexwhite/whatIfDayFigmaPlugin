if (figma.editorType === 'figma') {
  figma.showUI(__html__);
  figma.ui.resize(300, 500);

  figma.ui.onmessage = async msg => {
    await figma.loadFontAsync({ family: "SF Pro Display", style: "Regular" })
    if (msg.type === 'insert') {
      for (const node of figma.currentPage.selection) {
        if (node.type === 'TEXT') {
          node.characters = msg.field
        }
      }
    } else if (msg.type === "insertAll") {
      await figma.loadFontAsync({ family: "SF Pro Display", style: "Regular" })
      let data = msg.data
      const fields = Object.keys(data)

      for (const field of fields) {
        const pageNodes = figma.currentPage.findAll(sceneNode => sceneNode.visible && sceneNode.type === "TEXT" && sceneNode.name.includes(field))
        if (pageNodes.length) {
          for (const pageNode of pageNodes) {
            (pageNode as TextNode).characters = data[field]
          }
        }
      }
    } else {
      figma.closePlugin();
    }

  };
}