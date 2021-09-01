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

      for (const node of figma.currentPage.selection) {
        if (node.type === 'TEXT') {
          node.characters = data.shift()
        }
      }
    } else {
      figma.closePlugin();
    }

  };
} 