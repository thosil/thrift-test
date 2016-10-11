struct Message {
    1: i32 id;
    2: string name;
    3: string desc;
}

service Messager {
    void send(1:Message msg)
}
