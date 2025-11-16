// Serializer: Convert JS Object to TOON format

class Serializer {
  constructor(indent = 3) {
    this.indent = indent;
  }

  serialize(value, depth = 0) {
    const type = typeof value;
    const spaces = ' '.repeat(depth * this.indent);
    
    if (value === null || value === undefined) {
      return 'STR(value, "")';
    }
    
    if (Array.isArray(value)) {
      return this.serializeList(value, depth);
    }
    
    if (type === 'object') {
      return this.serializeObject(value, depth);
    }
    
    if (type === 'string') {
      return `"${this.escapeString(value)}"`;
    }
    
    if (type === 'number') {
      return value.toString();
    }
    
    if (type === 'boolean') {
      return value.toString();
    }
    
    return '""';
  }

  serializeObject(obj, depth = 0) {
    const spaces = ' '.repeat(depth * this.indent);
    const innerSpaces = ' '.repeat((depth + 1) * this.indent);
    
    const entries = Object.entries(obj).map(([key, value]) => {
      const type = this.inferType(value);
      
      if (type === 'OBJ') {
        const objContent = this.serializeObject(value, depth + 1);
        return `${innerSpaces}${type}(${key},\n${objContent}\n${innerSpaces})`;
      } else if (type === 'LIST') {
        const listContent = this.serializeList(value, depth + 1);
        return `${innerSpaces}${type}(${key}, ${listContent})`;
      } else {
        const serializedValue = this.serialize(value, depth + 1);
        return `${innerSpaces}${type}(${key}, ${serializedValue})`;
      }
    });
    
    if (depth === 0) {
      return `OBJ(\n${entries.join(',\n')}\n)`;
    }
    
    return entries.join(',\n');
  }

  serializeList(arr, depth = 0) {
    const items = arr.map(item => {
      // For primitive values in lists, serialize directly without wrapping
      const type = typeof item;
      if (type === 'string') {
        return `"${this.escapeString(item)}"`;
      } else if (type === 'number' || type === 'boolean') {
        return item.toString();
      } else if (Array.isArray(item)) {
        return this.serializeList(item, depth + 1);
      } else if (type === 'object' && item !== null) {
        return this.serializeObject(item, depth + 1);
      }
      return '""';
    });
    
    if (items.length === 0) {
      return '';
    }
    
    return items.join(', ');
  }

  inferType(value) {
    if (value === null || value === undefined) {
      return 'STR';
    }
    
    if (Array.isArray(value)) {
      return 'LIST';
    }
    
    const type = typeof value;
    
    if (type === 'object') {
      return 'OBJ';
    }
    
    if (type === 'string') {
      return 'STR';
    }
    
    if (type === 'number') {
      return Number.isInteger(value) ? 'INT' : 'FLOAT';
    }
    
    if (type === 'boolean') {
      return 'BOOL';
    }
    
    return 'STR';
  }

  escapeString(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t');
  }
}

function stringifyTOON(obj, indent = 3) {
  const serializer = new Serializer(indent);
  return serializer.serialize(obj);
}

export { Serializer, stringifyTOON };
