if (figma.editorType === 'figma') {
  figma.showUI(__html__);
  figma.ui.resize(300, 500);

  figma.ui.onmessage = async msg => {
    if (msg.type === 'insert') {
      for (const node of figma.currentPage.selection) {
        if (node.type === 'TEXT') {
          await figma.loadFontAsync({ family: "SF Pro Display", style: "Regular" })
          node.characters = msg.field
        }
      }
    } else if (msg.type === "insertAll") {
      setData(msg.data)
    }
    else if (msg.type === "insertLeadCard") {
      try {
        const leadNode = figma.root.findOne(e => e.type === "COMPONENT" && e.name === "Strategy Center/Lead Card")
        if (!leadNode) return

        (leadNode as ComponentNode).createInstance()

        setData(msg.data)
      } catch {
        console.log("Failed to load 'Strategy Center/Lead Card' component, please ensure it is in the team library");
      }
    }
    else if (msg.type === "insertAccountCard") {
      try {
        const leadNode = figma.root.findOne(e => e.type === "COMPONENT" && e.name === "Strategy Center/Account Details Card")
        if (!leadNode) return

        (leadNode as ComponentNode).createInstance()
        setData(msg.data)
      } catch {
        console.log("Failed to load 'Strategy Center/Account Details Card' component, please ensure it is in the team library");
      }
    }
    else {
      figma.closePlugin();
    }

  };
}

async function setData(data) {
  const fields = Object.keys(data)

  for (const field of fields) {
    const pageNodes = figma.currentPage.findAll(sceneNode => sceneNode.visible && sceneNode.type === "TEXT" && sceneNode.name.toLowerCase().includes(`field/${field.toLowerCase()}`))
    if (pageNodes.length) {
      await figma.loadFontAsync({ family: "SF Pro Display", style: "Regular" })
      await figma.loadFontAsync({ family: "SF Pro Display", style: "Bold" })
      for (const pageNode of pageNodes) {
        (pageNode as TextNode).characters = data[field]
      }
    }
  }
}