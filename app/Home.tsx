import React, { useState } from 'react';
import { Modal, TextInput, Platform, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [items, setItems] = useState<string[]>(["item 1", "item 2", "item 3", "item 4", "item 5"]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Afazeres</Text>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptySubtitle}>Nenhum item ainda</Text>
          <Text style={styles.emptyText}>Toque no botão + para adicionar uma tarefa.</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(_, idx) => String(idx)}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        accessibilityLabel="Adicionar tarefa"
        activeOpacity={0.85}
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.emptySubtitle}>Adicionar item</Text>
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Nome da tarefa"
              placeholderTextColor={Platform.OS === 'web' ? '#666' : undefined}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {
                  setText('');
                  setModalVisible(false);
                }}
                style={styles.btn}>
                <Text style={styles.emptyText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const value = text.trim();
                  if (value.length > 0) {
                    setItems(prev => [...prev, value]);
                  }
                  setText('');
                  setModalVisible(false);
                }}
                style={[styles.btn, styles.primaryBtn]}>
                <Text style={styles.emptyText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 40, backgroundColor: '#ffffff' },
  title: { fontSize: 32, fontWeight: '700', marginTop: 8, marginBottom: 16 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptySubtitle: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  emptyText: { fontSize: 16 },
  listContainer: { paddingBottom: 24 },
  listItem: { padding: 12, borderRadius: 8, backgroundColor: '#fafafa', marginBottom: 8, borderWidth: 1, borderColor: '#eee' },
  listItemText: { fontSize: 16 },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 60,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a84ff',
    elevation: 6,
  },
  fabText: { color: '#ffffff', fontSize: 36, lineHeight: 36 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
  modalContent: { padding: 16, borderRadius: 12, backgroundColor: '#ffffff' },
  input: { marginTop: 12, marginBottom: 12, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end' },
  btn: { paddingHorizontal: 12, paddingVertical: 8 },
  primaryBtn: { backgroundColor: '#e6f3ff', borderRadius: 6 },
});
