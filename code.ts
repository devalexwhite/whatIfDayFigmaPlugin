if (figma.editorType === 'figma') {
  figma.showUI(__html__);
  figma.ui.resize(300, 500);

  figma.ui.onmessage = async msg => {
    if (msg.type === 'insert') {
      for (const node of figma.currentPage.selection) {
        if (node.type === 'TEXT') {
          await figma.loadFontAsync({ family: "SF Pro Display", style: "Regular" })
          node.characters = "Hello world"
        }
      }
    }

    figma.closePlugin();
  };
} 